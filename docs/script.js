//Adding a click event listener to the element with id "calculate"
document.getElementById("calculate").addEventListener("click", async function () {
    //To get value from the input field
    const firstName = document.getElementById("firstName").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
   // To check and make sure weight and height values are numbers
    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight.");
        return;
    }
   // Calculating BMI
    const bmi = weight / ((height / 100) * (height / 100));
    //Getting BMI categories from the calculated BMI
    const bmiCategory = getBMICategory(bmi);

    try {
        // An asynchronous request to fetch data from JSON file
        const response = await fetch('https://my-json-server.typicode.com/Ben1464/Phase-1-project/advice');

        if (!response.ok) {
            throw new Error('Failed to fetch advice data');
        }
        //Parsing the JSON response
        const adviceData = await response.json();

        //To Access advice data from the fetched JSON object
        const advice = adviceData.find((item) => item.category === bmiCategory);
        //To generate a personalized message
        const personalizedMessage = `Dear ${firstName}, your BMI is ${bmi.toFixed(2)}, which falls into the category of ${bmiCategory}. ${advice.message}`;

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("resultMessage").textContent = personalizedMessage;
    } catch (error) {
        //To handele errors during the fetch process
        console.error(error);
        alert('Failed to fetch advice data.');
    }
});
//Adding a click event listerner to hide the privacy policy
document.getElementById("showPrivacyPolicy").addEventListener("click", function () {
    document.getElementById("privacy-policy").classList.remove("hidden");
});

document.getElementById("hidePrivacyPolicy").addEventListener("click", function () {
    document.getElementById("privacy-policy").classList.add("hidden");
});
//Function to determine BMI category baseed on BMI values
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi < 24.9) {
        return "Normal Weight";
    } else if (bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obese";
    }
}