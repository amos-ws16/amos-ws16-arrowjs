
let task1 = {
  title: 'wash dishes',
  created_at: 1479916800,
  duedate: 1480003200,
  user: 'yves',
  assignees: ['jan', 'olli'],
  description: 'It is really dirty in here! Go and wash the dishes!'
}

let task2 = {
  title: 'read a book',
  created_at: 1479744000,
  duedate: 1480435200,
  user: 'fabian',
  assignees: ['simon', 'olli', 'kevin']
}

let task3 = {
  title: 'clean your room',
  created_at: 1479830400,
  duedate: 1480003200,
  user: 'yves',
  assignees: ['hans'],
  description: 'It is really dirty in here!',
  location: 'at home'
}

let task4 = {
  title: 'homework',
  created_at: 1482422400,
  duedate: 1482433200,
  user: 'otto',
  assignees: ['peter', 'simone'],
  location: 'at home'
}

let task5 = {
  title: 'print pdf',
  created_at: 1482422400,
  duedate: 1482433200,
  user: 'kevin',
  description: 'Print the "how to read a book" file'
}

let task6 = {
  title: 'do some sport',
  created_at: 1480359600,
  duedate: 1480446000,
  user: 'gerwin mueller II',
  location: 'gym'
}

let task7 = {
  title: 'create a presentation',
  created_at: 1472151600,
  duedate: 1480446000,
  user: 'max',
  assignees: ['sportsman5000', 'hans', 'guenther']
}

let task8 = {
  title: 'call ute',
  created_at: 1479841200,
  duedate: 1479844800,
  user: 'bernd',
  assignees: ['karl']
}

let testCase1 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7, task8],
  file: {
    title: 'dirty dish',
    filetype: 'jpeg',
    created_at: 1479916850,
    user: 'simon'
  }
}

let testCase2 = {
  tasks: [task1, task2, task3, task5],
  file: {
    title: 'How to read a book',
    filetype: 'pdf',
    created_at: 1479754800,
    user: 'gerald',
    description: 'This book teaches you how to read a book'
  }
}

let testCase3 = {
  tasks: [task1, task2, task3, task4, task5, task6],
  file: {
    title: 'superfit schedule',
    filetype: 'png',
    created_at: 1480359608,
    user: 'n0rd',
    description: 'This plan shows the schedule for the superfit gym'
  }
}

let testCase4 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    title: 'sport presentation',
    filetype: 'pptx',
    created_at: 1472497200,
    user: 'sportsman5000',
    description: 'wooooow look at my great presentation'
  }
}

let testCase5 = {
  tasks: [task1, task2, task5],
  file: {
    title: 'Wash your dishes right!',
    filetype: 'pdf',
    created_at: 1479754800,
    user: 'kevin',
    description: 'This is a book about how to wash your dishes realy clean.'
  }
}

let testCase6 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    title: '1',
    filetype: 'xml',
    created_at: 1345921200,
    user: 'petra'
  }
}

let testCase7 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7],
  file: {
    title: 'All keywords',
    filetype: 'json',
    created_at: 1480273200,
    user: 'ute',
    description: 'dishes, book, presentation, sport, homework, clean, pdf'
  }
}

let testCase8 = {
  tasks: [task6, task7, task8],
  file: {
    title: 'Contact: ute',
    filetype: 'json',
    created_at: 1479841320,
    user: 'bernd'
  }
}

let testCase9 = {
  tasks: [task1, task2, task3, task4, task5],
  file: {
    title: 'Contact: ute',
    filetype: 'json',
    created_at: 1479841320,
    user: 'bernd'
  }
}

let testCase10 = {
  tasks: [task1, task2, task3, task4, task5, task6, task7, task8],
  file: {
    title: 'sweet kitten',
    filetype: 'jpeg',
    created_at: 1479754920,
    user: 'jochen',
    description: 'look at this kitten!'
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
