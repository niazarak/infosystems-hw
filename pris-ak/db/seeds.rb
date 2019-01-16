admin = User.create(name: "admin", password: "admin")

mark1 = Postmark.create(name: "111", year: 2000)
mark2 = Postmark.create(name: "222", year: 1950)
mark3 = Postmark.create(name: "333", year: 1900)

alex = Collector.create(name: "Alex")
alex.postmarks << mark1
alex.postmarks << mark2

bruno = Collector.create(name: "Bruno")
bruno.postmarks << mark3