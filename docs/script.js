document.getElementById("calculate").addEventListener("click", async function () {
    const firstName = document.getElementById("firstName").value;
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);

    if (isNaN(height) || isNaN(weight)) {
        alert("Please enter valid height and weight.");
        return;
    }

    const bmi = weight / ((height / 100) * (height / 100));
    const bmiCategory = getBMICategory(bmi);

    try {
        // Make an asynchronous request to fetch advice data
        const response = await fetch('http://localhost:3000/advice'); // Assuming advice is available at this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch advice data');
        }
        const adviceData = await response.json();

        // Access advice data from the fetched JSON object
        const advice = adviceData[bmiCategory];
        const personalizedMessage = `Dear ${firstName}, your BMI is ${bmi.toFixed(2)}, which falls into the category of ${bmiCategory}. ${advice}`;

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("resultMessage").textContent = personalizedMessage;
    } catch (error) {
        console.error(error);
        alert('Failed to fetch advice data.');
    }
});

document.getElementById("showPrivacyPolicy").addEventListener("click", function () {
    document.getElementById("privacy-policy").classList.remove("hidden");
});

document.getElementById("hidePrivacyPolicy").addEventListener("click", function () {
    document.getElementById("privacy-policy").classList.add("hidden");
});

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