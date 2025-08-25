async function fakeAPI() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 100);
      resolve(randomNumber);
    }, 5000);
  });
}

async function getData() {
  try {
    const response1 = await fakeAPI();
    const response2 = await fakeAPI();
    const response3 = await fakeAPI();
    const sum = response3 + response2 + response1;

    console.log("fakeAPI 1 là: ", response1);
    console.log("fakeAPI 2 là: ", response2);
    console.log("fakeAPI 3 là: ", response3);

    console.log("Kết quả là: ", sum);
  } catch (error) {
    console.error(error);
  }
}
getData();
