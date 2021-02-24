const order = false;

const breakfastPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (order) {
      resolve('Your order is ready. Come and get it!');
    } else {
      reject(Error('Oh no! There was a problem with your order.'));
    }
  }, 3000);
});

console.log(breakfastPromise);
breakfastPromise
  .then(message => console.log(message))
  .catch(error => console.log(error));