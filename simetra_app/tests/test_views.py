from django.test import TestCase, Client
from django.urls import reverse
from django.contrib import messages
from django.contrib.auth import get_user_model
from simetra_app.models import Boss, Employee, City


class TestView(TestCase):

    # TODO: add page tests
    # TODO: add change models tests

    def setUp(self):
        self.client = Client()
        user_model = get_user_model()
        self.test_admin = user_model.objects.create_user('test_admin', 'test_admin@gmail.com', 'test_admin')

        self.main_page_url = reverse("simetra_app:main")

        self.staff_login_page_url = reverse("simetra_app:staff-login")
        self.staff_logout_page_url = reverse("simetra_app:staff-logout")
        self.customization_page_url = reverse("simetra_app:customization")

    def test_main_page_GET(self):
        response = self.client.get(self.main_page_url)

        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'simetra_app/main.html')

    def test_staff_login_page_GET(self):
        response = self.client.get((self.staff_login_page_url))

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
            'username':'no_admin',
            'password':'no_admin'
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

    def test_create_boss(self):
        #self.client.login()
        #response = self.client.get(reverse("simetra_app:customization"))

        #self.assertEqual(response.status_code, 200)

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
