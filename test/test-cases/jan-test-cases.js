
let task1 = {
  title: 'Hunt dinner',
  created_at: 1479916800,
  duedate: 1480003200,
  user: 'jan',
  assignees: ['jan', 'yves'],
  description: 'Jan is hungry!'
}

let task2 = {
  title: 'Go home, you are drunk!',
  created_at: 1479744000,
  duedate: 1480435200,
  user: 'jan',
  assignees: ['yves'],
  location: 'Berlin'
}

let task3 = {
  title: 'Get something to drink',
  created_at: 1479744000,
  duedate: 1480435200,
  user: 'jan',
  assignees: ['olli', 'simon'],
  description: 'Go down to the river and get some water'
}

let task4 = {
  title: 'Do laundry',
  created_at: 1482422400,
  duedate: 1482433200,
  user: 'jan',
  assignees: ['peter', 'georg'],
  location: 'at home'
}

let task5 = {
  title: 'Find the hotel mercure',
  created_at: 1482422400,
  duedate: 1482433200,
  user: 'jan'
}

let task6 = {
  title: 'Find a bed an breakfast in London',
  created_at: 1480359600,
  duedate: 1480446000,
  user: 'jan'
}

let task7 = {
  title: 'Gibberish',
  created_at: 1472151600,
  duedate: 1480446000,
  user: 'jan'
}

let task8 = {
  title: 'Go to bed!',
  created_at: 1479841200,
  duedate: 1479844800,
  user: 'john',
  assignees: ['john']
}

let testCase1 = {
  tasks: [task1, task2, task3],
  file: {
    title: 'hunt, pray, love',
    filetype: 'txt',
    created_at: 1479916850,
    user: 'jan'
  }
}

let testCase2 = {
  tasks: [task2, task1, task3],
  file: {
    title: 'Map of Berlin',
    filetype: 'jpg',
    created_at: 1479916800,
    user: 'jan'
  }
}

let testCase3 = {
  tasks: [task3, task1, task2],
  file: {
    title: 'Rivers, lakes and more',
    filetype: 'jpg',
    created_at: 1479916800,
    user: 'jan',
    description: 'Rivers to get water'
  }
}

let testCase4 = {
  tasks: [task4, task1, task2, task3],
  file: {
    title: 'How to do laundry 101',
    filetype: 'avi',
    created_at: 1482422400,
    user: 'jan',
    description: 'An easy manual for doing laundry!'
  }
}

let testCase5 = {
  tasks: [task5, task1, task2, task3],
  file: {
    title: 'hotel-mercure',
    filetype: 'jpg',
    created_at: 1479754800,
    user: 'jan'
  }
}

let testCase6 = {
  tasks: [task6, task2, task3, task4, task5],
  file: {
    title: 'bed and breakfasts in London',
    filetype: 'svg',
    created_at: 1345921200,
    user: 'jan'
  }
}

let testCase7 = {
  tasks: [task7, task1, task2, task3, task4, task5, task6],
  file: {
    title: 'Random-file',
    filetype: 'exe',
    created_at: 1480273200,
    user: 'jan'
  }
}

let testCase8 = {
  tasks: [task8, task1, task2],
  file: {
    title: 'sleep is good',
    filetype: 'docx',
    created_at: 1479841320,
    user: 'john'
  }
}

let testCase9 = {
  tasks: [task1, task2, task3, task4, task5],
  file: {
    title: 'asdf',
    filetype: 'mov',
    created_at: 1479916800,
    user: 'jan'
  }
}

let testCase10 = {
  tasks: [task2, task3, task4, task5, task6, task7, task8],
  file: {
    title: 'Berlin Berlin!',
    filetype: 'pdf',
    created_at: 1479754920,
    user: 'jan',
    description: 'Berlin is not as nice as Potsdam!'
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
