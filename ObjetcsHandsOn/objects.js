console.log("objectively");


var olivia = {
  name: "Olivia";
  email: "olivia@nypd.com";
  age: 52;
  employeed: true;
  favorite_movies: ["Pursuit of Happiness", "The Godfather"];
};


person['name'] = "mike";
person.email = "mike@mike.com";
person['age'] = 19;
person.employed = true;
person['favorite_movies'] = ["Jurastic Park", "Tree Of Life", "Greenland"];
var people = [];
people.push(person);

var amanda = {};

person['name'] = "Amanda";
person.email = "amanda@apple.com";
person['age'] = 49;
person.employed = true;
person['favorite_movies'] = ["Out Of Africa", "Tree Of Life", "Greenland"];

people.push(amanda);

people.push(hello);

console.log(people);
people.forEach((item, i) => {
  console.log(i + " : " + item);
});
