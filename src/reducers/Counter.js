function increment(prevState, action) {
  prevState.counter++;
  return prevState;
}

function decrement(prevState, action) {
  prevState.counter--;
  return prevState;
}

export default function register(app) {
  app.store.reduce('INCREMENT', increment);
  app.store.reduce('DECREMENT', decrement);
}
