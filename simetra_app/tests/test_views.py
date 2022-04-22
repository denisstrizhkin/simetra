from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from simetra_app.views import CityAttributesJSON
from simetra_app.models import Boss, Employee, City
from ast import literal_eval


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
        # TODO: test_city_page_GET
        pass

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
