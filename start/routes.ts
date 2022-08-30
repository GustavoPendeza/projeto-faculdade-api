import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/login', 'AuthController.login')

  Route.group(() => {

    Route.post('/logout', 'AuthController.logout')

    Route.patch('update-password', 'UsersController.updatePassword')

    Route.group(() => {

      Route.post('employee/register', 'EmployeesController.register')
      Route.post('student/register', 'StudentsController.register')

      Route.patch('employee/update/:id', 'EmployeesController.update')
      Route.patch('student/update/:id', 'StudentsController.update')

    }).middleware('admin')

  }).middleware('auth')

}).prefix('api')
