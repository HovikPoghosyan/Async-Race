const CARMARKS = [
   'Ferrari',
   'Porsche',
   'Lamborghini',
   'Mercedes-Benz',
   'BMW',
   'Audi',
   'Tesla',
   'Ford',
   'Chevrolet',
   'Toyota',
];

const CARMODELS = ['GT', 'M', 'AMG', 'COUPE', 'R', 'BRABUS', 'ALPINA', 'HENNESSEY', 'TRD', 'SHELBY'];

function getRandomColor() {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}

function getRandomCarName() {
   const mark = CARMARKS[Math.floor(Math.random() * 10)];
   const model = CARMODELS[Math.floor(Math.random() * 10)];
   return `${mark} ${model}`;
}

export { getRandomCarName, getRandomColor };
