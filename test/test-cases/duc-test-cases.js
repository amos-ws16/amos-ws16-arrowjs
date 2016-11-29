
let task1 = {
  name: 'apply for ERASMUS',
  created_at: 1479687500,
  due_date: 1483518000,
  user: 'kao',
  assignees: [ 'duc.nguyen', 'jasmin', 'scott' ],
  description: 'Apply for the winter and summer term ERASMUS program at the TU Berlin.',
  location: 'Berlin'
}

let task2 = {
  name: 'letter of recommendation',
  created_at: 1479555500,
  due_date: 1480398000,
  user: 'kao',
  assignees: [ 'duc.nguyen', 'jasmin' ],
  description: 'For the application of a semester abroad you need letters of recommendation from different faculties.',
  location: 'Germany'
}

let task3 = {
  name: 'Write a CV',
  created_at: 1493515800,
  due_date: 1531864730,
  user: 'duc.nguyen',
  description: 'Write a curriculum vitae for job applications, university programs, as an exercise etc.',
  location: 'no location'
}

let task4 = {
  name: 'learn NodeJS',
  created_at: 1479391500,
  due_date: 1479942000,
  user: 'dirk.riehle',
  assignees: [ 'duc.nguyen', 'jasmin', 'jason', 'scott' ],
  description: 'Every AMOS member should create 10 test examples with which we can use to evaluate our scoring mechanism.',
  location: 'no location'
}

let task5 = {
  name: 'visit home',
  created_at: 1479362100,
  due_date: 1479469800,
  user: 'jason',
  assignees: [ 'jasmin', 'duc.nguyen', 'kao', 'tai' ],
  description: 'Visit your mum and dad regularly.',
  location: 'Dresden'
}

let task6 = {
  name: 'exercise',
  created_at: 1484412200,
  due_date: 1485987800,
  user: 'jason',
  assignees: [ 'duc.nguyen', 'jasmin' ],
  description: 'Do some sport to stay fit in your everyday life.'
}

let task7 = {
  name: 'do homework',
  created_at: 1477336400,
  due_date: 1478645300,
  user: 'dirk.riehle',
  assignees: [ 'duc.nguyen', 'kao', 'tai', 'jasmin', 'jason', 'scott' ],
  description: 'To pass this semester you have to do homeworks every week. It is recommended to solve all tasks for a good grade.',
  location: 'no location'
}

let task8 = {
  name: 'do chores',
  created_at: 1479663200,
  due_date: 1480316150,
  user: 'duc.nguyen',
  assignees: [ 'kao', 'duc.nguyen', 'tai', 'jasmin', 'jason', 'dirk.riehle', 'scott' ]
}

let task9 = {
  name: 'pay bills',
  created_at: 1479654800,
  due_date: 1479545600,
  user: 'scott'
}

let task10 = {
  name: 'university project',
  created_at: 1473216680,
  due_date: 1479523130,
  user: 'dirk.riehle',
  assignees: [ 'duc.nguyen', 'jasmin', 'jason', 'scott', 'dirk.riehle' ],
  description: 'The new AMOS project during the winter term 2016/2017 is about writing an NodeJS application for an external company with functionality of scoring similiarities in tasks and files inside an chat.'
}

let testCase1 = {
  tasks: [task1, task2, task3],
  file: {
    name: 'study program abroad',
    filetype: 'pdf',
    created_at: 1488877310,
    user: 'duc.nguyen'
  }
}

let testCase2 = {
  tasks: [task4, task6, task7, task10],
  file: {
    name: 'winter term 2016',
    filetype: 'docx',
    created_at: 1477256232,
    user: 'scott'
  }
}

let testCase3 = {
  tasks: [task4, task5, task6, task7, task8],
  file: {
    name: 'everyday tasks',
    filetype: 'jpeg',
    created_at: 1488883310,
    user: 'jason'
  }
}

let testCase4 = {
  tasks: [task4, task6, task7, task10],
  file: {
    name: 'computer science',
    filetype: 'doc',
    created_at: 1483554331,
    user: 'dirk.riehle'
  }
}

let testCase5 = {
  tasks: [task1, task2, task3, task4, task6, task7, task8, task10],
  file: {
    name: 'future investment',
    filetype: 'png',
    created_at: 1488668864,
    user: 'jasmin'
  }
}

let testCase6 = {
  tasks: [task1, task2, task3],
  file: {
    name: 'computer science project',
    filetype: 'xml',
    created_at: 1483135483,
    user: 'duc.nguyen'
  }
}

let testCase7 = {
  tasks: [task1, task2, task3, task5, task7],
  file: {
    name: 'university and homework',
    filetype: 'zip',
    created_at: 1478926233,
    user: 'kao'
  }
}

let testCase8 = {
  tasks: [task7, task8],
  file: {
    name: 'sport',
    filetype: 'rar',
    created_at: 1480883310,
    user: 'jason'
  }
}

let testCase9 = {
  tasks: [task2, task3, task4],
  file: {
    name: 'job interview',
    filetype: 'pdf',
    created_at: 1476593520,
    user: 'kao'
  }
}

let testCase10 = {
  tasks: [task7, task8, task9],
  file: {
    name: 'parents and home',
    filetype: 'docx',
    created_at: 1485684310,
    user: 'tai'
  }
}

let testCases = [
  testCase1,
  testCase2,
  testCase3,
  testCase4,
  testCase5,
  testCase6,
  testCase7,
  testCase8,
  testCase9,
  testCase10
]

module.exports = {
  testCases
}
