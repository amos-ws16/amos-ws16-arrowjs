
let task1 = {
  name: 'create test cases',
  created_at: 1479391500, // 17.11.2016 @ 14:00:00
  due_date: 1479942000, // 24.11.2016 @ 12:00:00
  user: 'simonschwan',
  assignees: [ 'simonschwan', 'fabian', 'jan.huenges', 'kevstar', 'nguyen.duc0912', 'olli', 'yves' ],
  description: 'Every AMOS member should create 10 test examples with which we can use to evaluate our scoring mechanism.',
  location: 'no location'
}

let task2 = {
  name: 'organize final celebration',
  created_at: 1476705900, // 17.10.2016 @ 14:05:00
  due_date: 1486724400, // 10.02.2017 @ 12:00:00
  user: 'simonschwan',
  assignees: [ 'simonschwan', 'fabian', 'jan.huenges', 'kevstar', 'nguyen.duc0912', 'olli', 'yves' ],
  description: 'We have to find a location for our final party when we release our product. Therefore someone has to reserve a seat for everybody.',
  location: 'yet unknown'
}

let task3 = {
  name: 'move server to eu-west2',
  created_at: 1479392700, // 17.11.2016 @ 15:25:00
  due_date: 1480330800, // 28.11.2016 @ 12:00:00
  user: 'simonschwan',
  assignees: [ 'simonschwan' ],
  description: 'We need to move our AWS EC2 instances to the eu-west2 region as the slackbot servers will run over there. Pay attention that the system is available at most times.',
  location: 'no location'
}

let task4 = {
  name: 'write test with created examples',
  created_at: 1480061580, // 25.11.2016 @ 09:13:00
  due_date: 1480590000, // 01.12.2016 @ 12:00:00
  user: 'olli',
  assignees: [ 'olli' ],
  description: 'After creation of our test cases we will need to create a test which can give us an evaluation of our scoring system.',
  location: 'no location'
}

let task5 = {
  name: 'review offer',
  created_at: 1479899520, // 23.11.2016 @ 12:12:00
  due_date: 1479918600, // 23.11.2016 @ 17:30:00
  user: 'fabian',
  assignees: [ 'fabian' ],
  description: 'Two new offers with free laptops for everyone just arrived. Fabian has to reply until today 18:00 and therefore it would be nice if everybody could quickly check if his computer is in the pdf until 17:30.',
  location: 'no location'
}

let task6 = {
  name: 'buy coffey and mate',
  created_at: 1479921803, // 23.11.2016 @ 18:23:23
  due_date: 1479987000, // 24.11.2016 @ 12:30:00
  user: 'fabian',
  assignees: [ 'fabian' ],
  description: 'We need coffey and mate for our scrum meeting tomorrow.',
  location: 'TU Berlin - MAR'
}

let task7 = {
  name: 'create better test data',
  created_at: 1480076420, // 25.11.2016 @ 13:20:20
  due_date: 1483225200, // 01.01.2017 @ 00:00:00
  user: 'simonschwan',
  assignees: [ 'simonschwan', 'fabian', 'jan.huenges', 'kevstar', 'nguyen.duc0912', 'olli', 'yves' ],
  description: 'As it is very hard to create authentic test data we should also think about other data sources with which we can use to verify our scoring mechanism',
  location: 'no location'
}

let task8 = {
  name: 'plan christmas celebration',
  created_at: 1481439780, // 11.12.2016 @ 08:03:00
  due_date: 1482080400, // 18.12.2016 @ 18:00:00
  user: 'yves',
  assignees: [ 'yves' ],
  description: 'Find a room and organize food & drinks',
  location: 'yet unknown'
}

let testCase1 = {
  tasks: [ task1, task2, task3, task4, task5, task6, task7, task8 ],
  file: {
    name: 'test-cases',
    filetype: 'js',
    created_at: 1479897600, // 23.11.2016 @ 11:40:00
    user: 'simonschwan',
    description: 'This file includes all test scenarios we developed to test our application'
  }
}

let testCase2 = {
  tasks: [ task2, task1, task3, task4, task5, task6, task7, task8 ],
  file: {
    name: 'schleusenkrug',
    filetype: 'jpeg',
    created_at: 1485205200, // 23.01.2017 @ 22:00:00
    user: 'simonschwan',
    description: 'I found a location for our product release party. What do you think?'
  }
}

let testCase3 = {
  tasks: [ task3, task1, task2, task4, task5, task6, task7, task8 ],
  file: {
    name: 'pubkey',
    filetype: 'crt',
    created_at: 944908800, // 11/23/2016 @ 11:40:00
    user: 'simonschwan',
    description: 'Our new ssh key to connect to the new EC2 deployment instance'
  }
}

let testCase4 = {
  tasks: [ task4, task1, task2, task3, task5, task6, task7, task8 ],
  file: {
    name: 'annoyed-donald',
    filetype: 'jpeg',
    created_at: 1480061700, // 25.11.2016 @ 09:15:00
    user: 'simonschwan',
    description: 'This picture shows how annoying it was to create the test cases last week. Hopefully the tests will work fine!'
  }
}

let testCase5 = {
  tasks: [
    task5, task1, task2, task3, task4, task6, task7, task8 ],
  file: {
    name: 'offer_ibm_14346134356',
    filetype: 'pdf',
    created_at: 1479899700, // 23.11.2016 @ 12:15:00
    user: 'simonschwan',
    description: 'Offer with new IBM Thinkpads'
  }
}

let testCase6 = {
  tasks: [ task5, task1, task2, task3, task4, task6, task7, task8 ],
  file: {
    name: 'offer_lenovo_14346134356',
    filetype: 'pdf',
    created_at: 1479899820, // 23.11.2016 @ 12:17:00
    user: 'simonschwan',
    description: 'Offer with new Lenovo Laptops'
  }
}

let testCase7 = {
  tasks: [ task5, task1, task2, task3, task4, task6, task7, task8 ],
  file: {
    name: 'ibm-thinkpad',
    filetype: 'jpeg',
    created_at: 1479899760, // 23.11.2016 @ 12:16:00
    user: 'simonschwan',
    description: 'no description'
  }
}

let testCase8 = {
  tasks: [ task6, task1, task2, task3, task4, task5, task7, task8 ],
  file: {
    name: 'jacobs-kroenung',
    filetype: 'jpeg',
    created_at: 1479942000, // 24.11.2016 @ 00:00:00
    user: 'simonschwan',
    description: 'These are my favourite coffey beans (fyi).'
  }
}

let testCase9 = {
  tasks: [ task7, task1, task2, task3, task4, task5, task6, task8 ],
  file: {
    name: 'new_possible_test_set',
    filetype: 'js',
    created_at: 1482606000, // 24.12.2016 @ 20:00:00
    user: 'jan.huenges',
    description: 'This is a more reliable and professional test set with which we can verify our system'
  }
}

let testCase10 = {
  tasks: [ task8, task1, task2, task3, task4, task5, task6, task7 ],
  file: {
    name: 'santa_clause',
    filetype: 'jpeg',
    created_at: 1482080400, // 18.12.2016 @ 18:00:00
    user: 'yves',
    description: 'no description'
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
