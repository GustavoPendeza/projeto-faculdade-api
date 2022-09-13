import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.post('/login', 'AuthController.login')

  //---------------------------ROTAS COM LOGIN---------------------------------
  Route.group(() => {

    Route.post('/logout', 'AuthController.logout')

    Route.patch('update-password', 'UsersController.updatePassword')

    //-------------------------ROTAS DE ADMIN----------------------------------
    Route.group(() => {

      Route.get('course/list', 'CoursesController.list')
      Route.get('employee/list', 'EmployeesController.list')
      Route.get('student/list', 'StudentsController.list')
      Route.get('student-course/list', 'StudentCoursesController.list')
      Route.get('lesson/list', 'LessonsController.list')

      Route.post('employee/register', 'EmployeesController.register')
      Route.post('student/register', 'StudentsController.register')
      Route.post('admin/store', 'AdminsController.store')
      Route.post('course/store', 'CoursesController.store')
      Route.post('student-course/store', 'StudentCoursesController.store')
      Route.post('lesson/store', 'LessonsController.store')

      Route.patch('employee/update/:id', 'EmployeesController.update')
      Route.patch('user/update-password/:id', 'UsersController.updateUserPassword')
      Route.patch('student/update/:id', 'StudentsController.update')
      Route.patch('student/expel/:id', 'StudentsController.expelStudent')
      Route.patch('course/update/:id', 'CoursesController.update')
      Route.patch('student-course/update/:id', 'StudentCoursesController.update')
      Route.patch('lesson/update/:id', 'LessonsController.update')

      Route.delete('admin/delete/:id', 'AdminsController.destroy')
      Route.delete('course/delete/:id', 'CoursesController.destroy')
      Route.delete('lesson/delete/:id', 'LessonsController.destroy')

    }).middleware('admin')

  }).middleware('auth')

}).prefix('api')
