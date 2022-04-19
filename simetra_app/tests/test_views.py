from django.test import TestCase, Client


class TestView(TestCase):

    # TODO: add page tests
    # TODO: add change models tests

    def SetUp(self):
        self.client = Client()

    def test_create_boss(self):
        self.client.login()
        self.client.get('customization/change-boss/create-boss/')

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
