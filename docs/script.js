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
        // Store user data in the JSON server
        const userDataResponse = await fetch('https://my-json-server.typicode.com/Ben1464/Phase-1-project/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: { name: firstName, height, bmi }, bmiCategory }),
        });

        if (!userDataResponse.ok) {
            throw new Error('Failed to store user data');
        }

        // Fetch advice data from the JSON server
        const adviceResponse = await fetch('https://my-json-server.typicode.com/Ben1464/Phase-1-project/advice');
        if (!adviceResponse.ok) {
            throw new Error('Failed to fetch advice data');
        }

        const adviceData = await adviceResponse.json();
        const advice = adviceData.find((item) => item.category === bmiCategory);

        // Display personalized message to the user
        const personalizedMessage = `Dear ${firstName}, your BMI is ${bmi.toFixed(2)}, which falls into the category of ${bmiCategory}. ${advice.message}`;

        document.getElementById("result").classList.remove("hidden");
        document.getElementById("resultMessage").textContent = personalizedMessage;
    } catch (error) {
        console.error(error);
        alert('Failed to store user data or fetch advice data.');
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