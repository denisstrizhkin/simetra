from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from simetra_app.views import CityAttributesJSON
from simetra_app.models import Boss, Employee, City
from ast import literal_eval
from json import loads


class TestView(TestCase):

    # TODO: add page tests
    # TODO: add change models tests

    def setUp(self):
        self.client = Client()
        user_model = get_user_model()
        self.test_admin = user_model.objects.create_user('test_admin', 'test_admin@gmail.com', 'test_admin')

        self.main_page_url = reverse("simetra_app:main")
        self.methodology_page_url = reverse("simetra_app:methodology")
        self.analytics_page_url = reverse("simetra_app:analytics")
        self.data_base_page_url = reverse("simetra_app:data-base")

        self.staff_login_page_url = reverse("simetra_app:staff-login")
        self.staff_logout_page_url = reverse("simetra_app:staff-logout")
        self.customization_page_url = reverse("simetra_app:customization")

    def test_main_page_GET(self):
        Boss.objects.create(
            name="Test_Boss",
            position="Test_boss_position",
            quote="Testing is funny enough"
        )

        Employee.objects.create(
            name="Test_Employee",
            position="Test_employee_position",
        )

        for x in range(1, 11):
            City.objects.create(
                name=f"Test_city_{x}",
                longitude=x,
                latitude=x,
                russian_name=f"Тестовый_город_{x}"
            )

        response = self.client.get(self.main_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/main.html')
        self.assertEqual(list(response.context["bosses_list"]), [Boss.objects.first()])
        self.assertEqual(list(response.context["employees_list"]), [Employee.objects.first()])
        self.assertEqual(response.context['number_of_cities'], 10)

    def test_staff_login_page_GET(self):
        response = self.client.get(self.staff_login_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, "simetra_app/staff-login.html")

    def test_staff_login_page_redirect(self):
        self.client.force_login(user=self.test_admin)
        response = self.client.get(self.staff_login_page_url)

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.customization_page_url)
        self.client.logout()

    def test_staff_login_page_POST_not_admin_auth(self):
        response = self.client.post(self.staff_login_page_url, data={
            'username': 'no_admin',
            'password': 'no_admin'
        })

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/staff-login.html')

    def test_staff_login_page_POST_admin_auth(self):
        response = self.client.post(self.staff_login_page_url, data={
            'username': 'test_admin',
            'password': 'test_admin'
        })

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.customization_page_url)

    def test_staff_logout_page_GET(self):
        response = self.client.get(self.staff_logout_page_url)

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(response, self.staff_login_page_url)

    def test_methodology_page_GET(self):
        response = self.client.get(self.methodology_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/methodology.html')

    def test_analytics_page_GET(self):
        city_info = dict(
            name='Analytics_test_city',
            russian_name="Город для теста аналитики",
            region="10101",
            rating_security_n_development=10.0,
            rating_comfort_n_convenience=11.0,
            rating_route_network_efficiency=12.0,
            rating_affordability=60.0,
            rating_physical_availability=55.0,
            sum_of_rating=148.0,
        )
        City.objects.create(**city_info)
        response = self.client.get(self.analytics_page_url)
        data = literal_eval(response.context['cities_list_json'][0])

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/analytics.html')
        self.assertDictEqual(data, city_info)

    def test_data_base_page_GET(self):
        city_models = []
        cities = [
            {
                'name': f"Test_city_{rating}",
                'longitude': '1.0',
                'sum_of_rating': f'{rating}'
            }
            for rating in [2.0, 3.0, 1.0]
        ]
        for city in cities:
            city_models.append(City.objects.create(**city))

        response = self.client.get(self.data_base_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/data-base.html')
        self.assertEqual(list(response.context['cities_list']),
                         [city_models[1], city_models[0], city_models[2]])
        self.assertEqual(response.context['number_of_cities'], 3)

    def test_city_page_GET(self):
        test_city = City.objects.create(
            name='Test_city'
        )

        required_fields = [
            'name',
            'longitude',
            'latitude',
            'rating_security_n_development',
            'rating_comfort_n_convenience',
            'rating_route_network_efficiency',
            'rating_affordability',
            'rating_physical_availability',
            'num_population',
            'length_UDS',
            'area_active_city_zone',
            'traffic_ground_transport',
            'traffic_metro',
            'num_working_stops_overall',
            'num_working_stops_active_city_zone',
            'num_of_apartments',
            'proportion_apartments_in_coverage_zone',
            'proportion_people_in_coverage_zone',
            'area_stops_active_zone_coverage_500',
            'area_stops_active_zone_coverage_700',
            'area_stops_active_zone_coverage_1000',
            'proportion_apartments_in_metro_coverage_zone',
            'proportion_people_in_metro_coverage_zone',
            'area_metro_coverage',
            'density_stops_active_zone',
            'percent_transport_covered_area',
            'percent_metro_covered_area',
            'num_people_with_metro_access',
            'proportion_people_with_metro_access',
            'num_people_with_transport_access',
            'proportion_people_with_transport_access',
            'avrg_length_between_stops',
            'num_death_toll',
            'num_wounded',
            'num_accidents',
            'num_accidents_per_transport_unit',
            'num_wounded_n_dead_per_accident',
            'num_wounded_n_dead_per_people',
            'num_tramway_cars',
            'num_trolleybuses',
            'num_electrobuses',
            'num_buses',
            'num_metro_cars',
            'num_working_tramway_cars',
            'num_working_trolleybuses',
            'num_working_electrobuses',
            'num_working_buses',
            'num_working_metro_cars',
            'percent_working_tramway_cars',
            'percent_working_trolleybuses',
            'percent_working_electrobuses',
            'percent_working_buses',
            'percent_working_metro_cars',
            'num_all_buses_registry',
            'num_very_big_buses_registry',
            'num_big_buses_registry',
            'num_medium_buses_registry',
            'num_small_buses_registry',
            'num_all_trolleybuses_registry',
            'num_big_trolleybuses_registry',
            'num_very_big_trolleybuses_registry',
            'num_tramway_cars_registry',
            'num_big_tramway_cars_registry',
            'num_very_big_tramway_cars_registry',
            'avrg_age_tramway_car',
            'avrg_age_trolleybus',
            'avrg_age_bus',
            'avrg_age_electrobus',
            'avrg_age_metro_car',
            'num_low_profile_tramway_cars',
            'num_low_profile_trolleybuses',
            'num_low_profile_buses',
            'num_low_profile_electrobuses',
            'num_new_GET',
            'num_new_buses',
            'proportion_low_profile_transport',
            'proportion_big_capacity_transport',
            'proportion_electro_transport',
            'proportion_working_transport',
            'percent_renew_program',
            'num_routes_in_use_tramway',
            'num_routes_in_use_trolleybus',
            'num_routes_in_use_bus',
            'num_routes_in_use_overall',
            'num_routes_regulated_tariff',
            'num_routes_unregulated_tariff',
            'proportion_routes_unregulated_tariff',
            'length_avrg_tramway_route',
            'length_avrg_trolleybus_route',
            'length_avrg_bus_route',
            'length_existing_tramway_routes',
            'length_in_use_tramway_routes',
            'length_existing_trolleybus_routes',
            'length_in_use_trolleybus_routes',
            'length_overall_nonrailed_transport_path',
            'percent_isolated_tramway_routes',
            'coeff_tramway_net_use',
            'coeff_trolleybus_net_use',
            'num_segments_avrg_load',
            'num_segments_high_load',
            'time_avrg_waiting_any_transport',
            'time_avrg_waiting_specific_transport',
            'coeff_route',
            'coeff_non_straight_route',
            'bool_transport_app',
            'bool_rt_internet_movement_info',
            'bool_transport_schedule_website',
            'bool_transport_route_net_map',
            'bool_unique_transporte_style',
            'avrg_region_salary',
            'avrg_region_income',
            'price_monthly_transport_pass',
            'ratio_pass_cost_to_income',
            'num_routes_with_pass',
            'num_routes_with_transfer_pass',
            'price_SOT',
            'price_one_time_ticket',
            'price_one_time_ticket_discount',
            'price_transfer_pass',
            'bool_universal_transport_card',
            'bool_online_payment',
            'bool_nfc_payment',
            'bool_transfer_pass',
            'bool_day_pass',
            'bool_long_period_pass'
        ]

        self.city_page_url = reverse('simetra_app:city-page', kwargs={'city_name': 'Test_city'})
        response = self.client.get(self.city_page_url)
        data = loads(response.context['cities_list_json'][0])

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/city-page.html')
        self.assertEqual(response.context['city'], test_city)
        self.assertEqual(list(data.keys()), required_fields)

    def test_customization_page_GET_with_login(self):
        self.client.force_login(user=self.test_admin)
        response = self.client.get(self.customization_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/customization.html')

    def test_customization_page_GET_without_login(self):
        response = self.client.get(self.customization_page_url)

        self.assertEqual(response.status_code, 302)
        self.assertRedirects(
            response,
            "%s?next=%s" % (self.staff_login_page_url, self.customization_page_url)
        )

    def test_create_boss(self):
        # self.client.login()
        # response = self.client.get(reverse("simetra_app:customization"))

        # self.assertEqual(response.status_code, 200)

        # TODO: test_create_boss
        pass

    def test_update_boss(self):
        # TODO: test_update_boss
        pass

    def test_delete_boss(self):
        # TODO: test_delete_boss
        pass

    def test_delete_all_bosses(self):
        # TODO: test_delete_all_bosses
        pass

    def test_create_city(self):
        # TODO: test_create_city
        pass

    def test_update_city(self):
        # TODO: test_update_city
        pass

    def test_update_city_excel(self):
        # TODO: test_update_city_excel
        pass

    def test_deleting_city(self):
        # TODO: test_deleting_city
        pass

    def test_deleting_all_cities(self):
        # TODO: test_deleting_all_cities
        pass

    def test_create_employee(self):
        # TODO: test_create_employee
        pass

    def test_update_employee(self):
        # TODO: test_update_employee
        pass

    def test_delete_employee(self):
        # TODO: test_deleting_employee
        pass

    def test_delete_all_employees(self):
        # TODO: test_deleting_all_employees
        pass

    def test_does_city_already_exist(self):
        # TODO: test_does_city_already_exist
        pass
