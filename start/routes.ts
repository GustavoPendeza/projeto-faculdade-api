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
      Route.get('admin/list', 'AdminsController.list')
      Route.get('student-course/list', 'StudentCoursesController.list')
      Route.get('lesson/list', 'LessonsController.list')
      Route.get('schedule/list-admin', 'SchedulesController.listAdmin')
      Route.get('enrollment/list-admin', 'EnrollmentsController.listAdmin')

      Route.post('employee/register', 'EmployeesController.register')
      Route.post('student/register', 'StudentsController.register')
      Route.post('admin/store', 'AdminsController.store')
      Route.post('course/store', 'CoursesController.store')
      Route.post('student-course/store', 'StudentCoursesController.store')
      Route.post('lesson/store', 'LessonsController.store')
      Route.post('schedule/store', 'SchedulesController.store')

      Route.patch('employee/update/:id', 'EmployeesController.update')
      Route.patch('user/update-password/:id', 'UsersController.updateUserPassword')
      Route.patch('student/update/:id', 'StudentsController.update')
      Route.patch('student/expel/:id', 'StudentsController.expelStudent')
      Route.patch('course/update/:id', 'CoursesController.update')
      Route.patch('student-course/update/:id', 'StudentCoursesController.update')
      Route.patch('lesson/update/:id', 'LessonsController.update')
      Route.patch('schedule/update/:id', 'SchedulesController.update')

      Route.delete('admin/delete/:id', 'AdminsController.destroy')
      Route.delete('course/delete/:id', 'CoursesController.destroy')
      Route.delete('lesson/delete/:id', 'LessonsController.destroy')
      Route.delete('schedule/delete/:id', 'SchedulesController.destroy')

    }).middleware('admin')

    //-------------------------ROTAS DE FUNCIONÁRIO--------------------------
    Route.group(() => {

      Route.patch('enrollment/grade-update/:id', 'EnrollmentsController.gradeUpdate')

    }).middleware('employee')

    //-------------------------ROTAS DE ALUNO-------------------------------
    Route.group(() => {
      
      Route.get('schedule/list-student', 'SchedulesController.listStudent')
      Route.get('enrollment/list-student', 'EnrollmentsController.listStudent')

      Route.post('enrollment/store', 'EnrollmentsController.store')

      Route.patch('enrollment/unenroll/:id', 'EnrollmentsController.unenroll')

    }).middleware('student')

  }).middleware('auth')

}).prefix('api')
