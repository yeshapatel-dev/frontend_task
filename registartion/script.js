document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("studentForm");

    // validate function (same pattern as yours)
    function setValidity(input, errorElement, condition, message) {
        if (condition) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            errorElement.textContent = "";
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            errorElement.textContent = message;
        }
    }

    // First Name
    const firstName = document.getElementById("firstName");
    const firstNameError = document.getElementById("firstNameError");

    firstName.addEventListener("input", function() {
        setValidity(firstName, firstNameError, firstName.value.trim().length >= 2, "Must be at least 2 characters");
    });

    // Last Name
    const lastName = document.getElementById("lastName");
    const lastNameError = document.getElementById("lastNameError");

    lastName.addEventListener("input", function() {
        setValidity(lastName, lastNameError, lastName.value.trim().length >= 2, "Must be at least 2 characters");
    });

    // Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");

    email.addEventListener("input", function() {
        const ok = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value.trim()) && email.value.trim() !== "";
        setValidity(email, emailError, ok, "Please enter a valid email address");
    });

    // Phone
    const phone = document.getElementById("phone");
    const phoneError = document.getElementById("phoneError");

    phone.addEventListener("input", function() {
        const ok = /^\d{10}$/.test(phone.value.trim());
        setValidity(phone, phoneError, ok, "Please enter a valid phone number (10 digits)");
    });

    // Postal Code
    const postalCode = document.getElementById("postalCode");
    const postalCodeError = document.getElementById("postalCodeError");

    postalCode.addEventListener("input", function() {
        const ok = /^\d{6}$/.test(postalCode.value.trim());
        setValidity(postalCode, postalCodeError, ok, "Please enter a valid postal code (6 digits)");
    });

    // Student ID
    const studentId = document.getElementById("studentId");
    const studentIdError = document.getElementById("studentIdError");

    studentId.addEventListener("input", function() {
        studentId.value = studentId.value.toUpperCase();
        const ok = /^STU\d{4}$/.test(studentId.value.trim());
        setValidity(studentId, studentIdError, ok, "Student ID must follow the pattern STU1234");
    });

    // Learning support
    const learningSupport = document.getElementById("learningSupport");
    const supportDetailsWrapper = document.getElementById("supportDetailsWrapper");
    const supportDetails = document.getElementById("supportDetails");
    const supportDetailsError = document.getElementById("supportDetailsError");

    learningSupport.addEventListener("change", () => {
        if (learningSupport.checked) {
            supportDetailsWrapper.hidden = false;
            supportDetails.focus();
        } else {
            supportDetailsWrapper.hidden = true;
            supportDetails.value = "";
            supportDetailsError.textContent = "";
            supportDetails.classList.remove("valid", "invalid");
        }
    });

    // supportDetails validation (only when visible)
    supportDetails.addEventListener("input", () => {
        if (learningSupport.checked) {
            const ok = supportDetails.value.trim().length >= 5;
            setValidity(supportDetails, supportDetailsError, ok, "Please provide at least 5 characters");
        } else {
            supportDetails.classList.remove("valid", "invalid");
            supportDetailsError.textContent = "";
        }
    });

    // Terms checkbox
    const terms = document.getElementById("terms");
    const termsError = document.getElementById("termsError");

    terms.addEventListener("change", () =>
        setValidity(terms, termsError, terms.checked, "You must agree to the Terms and Conditions")
    );

    // Profile Picture
    const profilePic = document.getElementById("profilePic");
    const profilePicError = document.getElementById("profilePicError");
    const imgPreview = document.getElementById("imgPreview");

    profilePic.addEventListener("change", function() {
        imgPreview.innerHTML = "";
        profilePicError.textContent = "";

        const file = profilePic.files[0];
        if (!file) {
            setValidity(profilePic, profilePicError, false, "Please select an image file");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setValidity(profilePic, profilePicError, false, "Selected file is not an image");
            profilePic.value = ""; // reset input
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement("img");
            img.src = e.target.result;
            img.alt = "Profile preview";
            img.style.maxWidth = "100px";
            img.style.maxHeight = "100px";
            img.style.borderRadius = "8px";
            imgPreview.appendChild(img);
            setValidity(profilePic, profilePicError, true, "");
        };
        reader.onerror = function() {
            setValidity(profilePic, profilePicError, false, "Could not read the image file");
        };
        reader.readAsDataURL(file);
    });

    // submit
    form.onsubmit = function(event) {
        event.preventDefault();

        if (firstName.value.trim().length < 2) {
            alert("First Name must be at least 2 characters long");
            firstName.focus();
            return false;
        }
        if (lastName.value.trim().length < 2) {
            alert("Last Name must be at least 2 characters long");
            lastName.focus();
            return false;
        }
        if (!/^\d{10}$/.test(phone.value.trim())) {
            alert("Please enter a valid Phone number (10 digits)");
            phone.focus();
            return false;
        }
        if (!/^\d{6}$/.test(postalCode.value.trim())) {
            alert("Please enter a valid postal code (6 digits)");
            postalCode.focus();
            return false;
        }
        if (!/^STU\d{4}$/.test(studentId.value.trim())) {
            alert("Student ID must follow STU1234 pattern");
            studentId.focus();
            return false;
        }
        if (!terms.checked) {
            alert("You must agree to the Terms and Conditions");
            return false;
        }

        // success
        alert("Thank you for registering, " + firstName.value + "!");

        form.reset();
        supportDetailsWrapper.hidden = true;
        supportDetails.value = "";
        imgPreview.innerHTML = "";
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(i => i.classList.remove("valid", "invalid"));
        const errors = form.querySelectorAll(".error-msg");
        errors.forEach(e => e.textContent = "");
        profilePic.value = "";
        return true;

    };


    // reset
    form.addEventListener("reset", function() {

        form.reset();
        supportDetailsWrapper.hidden = true;
        supportDetails.value = "";
        imgPreview.innerHTML = "";
        const inputs = form.querySelectorAll("input, textarea");
        inputs.forEach(i => i.classList.remove("valid", "invalid"));
        const errors = form.querySelectorAll(".error-msg");
        errors.forEach(e => e.textContent = "");
        profilePic.value = "";
    });

});