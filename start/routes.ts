import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/login', 'AuthController.login')

  //---------------------------ROTAS COM LOGIN---------------------------------
  Route.group(() => {

    Route.post('/logout', 'AuthController.logout')

    Route.patch('update-password', 'UsersController.updatePassword')

    //-------------------------ROTAS DE ADMIN----------------------------------
    Route.group(() => {

      Route.get('employee/list', 'EmployeesController.list')
      Route.get('student/list', 'StudentsController.list')

      Route.post('employee/register', 'EmployeesController.register')
      Route.post('student/register', 'StudentsController.register')
      Route.post('admin/create', 'AdminsController.create')

      Route.patch('employee/update/:id', 'EmployeesController.update')
      Route.patch('user/update-password/:id', 'UsersController.updateUserPassword')
      Route.patch('student/update/:id', 'StudentsController.update')
      Route.patch('student/expel/:id', 'StudentsController.expelStudent')

      Route.delete('admin/delete/:id', 'AdminsController.delete')

    }).middleware('admin')

  }).middleware('auth')

}).prefix('api')
