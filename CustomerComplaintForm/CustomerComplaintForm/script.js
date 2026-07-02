// Helper functions
const setValid = (el) => el.style.borderColor = "green";
const setInvalid = (el) => el.style.borderColor = "red";

// Validation function
function validateForm() {
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const orderNo = document.getElementById("order-no").value.trim();
  const productCode = document.getElementById("product-code").value.trim();
  const quantity = document.getElementById("quantity").value.trim();

  const complaints = document.querySelectorAll("#complaints-group input[type='checkbox']");
  const otherComplaint = document.getElementById("other-complaint");
  const complaintDesc = document.getElementById("complaint-description").value.trim();

  const solutions = document.querySelectorAll("#solutions-group input[type='radio']");
  const otherSolution = document.getElementById("other-solution");
  const solutionDesc = document.getElementById("solution-description").value.trim();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const orderRegex = /^2024\d{6}$/;
  const productRegex = /^[A-Za-z]{2}\d{2}-[A-Za-z]\d{3}-[A-Za-z]{2}\d$/;

  const result = {
    "full-name": fullName.length > 0,
    "email": emailRegex.test(email),
    "order-no": orderRegex.test(orderNo),
    "product-code": productRegex.test(productCode),
    "quantity": Number.isInteger(Number(quantity)) && Number(quantity) > 0,
    "complaints-group": [...complaints].some(c => c.checked),
    "complaint-description": !otherComplaint.checked || complaintDesc.length >= 20,
    "solutions-group": [...solutions].some(r => r.checked),
    "solution-description": !otherSolution.checked || solutionDesc.length >= 20
  };

  return result;
}

// Check overall validity
function isValid(validationObj) {
  return Object.values(validationObj).every(v => v === true);
}

// Field listeners
function setupValidation() {

  const fullName = document.getElementById("full-name");
  const email = document.getElementById("email");
  const orderNo = document.getElementById("order-no");
  const productCode = document.getElementById("product-code");
  const quantity = document.getElementById("quantity");

  const complaintsFieldset = document.getElementById("complaints-group");
  const complaintBoxes = complaintsFieldset.querySelectorAll("input[type='checkbox']");
  const complaintDesc = document.getElementById("complaint-description");
  const otherComplaint = document.getElementById("other-complaint");

  const solutionsFieldset = document.getElementById("solutions-group");
  const solutionRadios = solutionsFieldset.querySelectorAll("input[type='radio']");
  const solutionDesc = document.getElementById("solution-description");
  const otherSolution = document.getElementById("other-solution");

  // Individual inputs
  fullName.addEventListener("change", () => {
    validateForm()["full-name"] ? setValid(fullName) : setInvalid(fullName);
  });

  email.addEventListener("change", () => {
    validateForm()["email"] ? setValid(email) : setInvalid(email);
  });

  orderNo.addEventListener("change", () => {
    validateForm()["order-no"] ? setValid(orderNo) : setInvalid(orderNo);
  });

  productCode.addEventListener("change", () => {
    validateForm()["product-code"] ? setValid(productCode) : setInvalid(productCode);
  });

  quantity.addEventListener("change", () => {
    validateForm()["quantity"] ? setValid(quantity) : setInvalid(quantity);
  });

  // Complaint checkboxes
  complaintBoxes.forEach(box => {
    box.addEventListener("change", () => {
      validateForm()["complaints-group"]
        ? setValid(complaintsFieldset)
        : setInvalid(complaintsFieldset);
    });
  });

  // Complaint description
  complaintDesc.addEventListener("change", () => {
    validateForm()["complaint-description"]
      ? setValid(complaintDesc)
      : setInvalid(complaintDesc);
  });

  // Solution radios
  solutionRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      validateForm()["solutions-group"]
        ? setValid(solutionsFieldset)
        : setInvalid(solutionsFieldset);
    });
  });

  // Solution description
  solutionDesc.addEventListener("change", () => {
    validateForm()["solution-description"]
      ? setValid(solutionDesc)
      : setInvalid(solutionDesc);
  });
}

// Submit handling
document.querySelector("form").addEventListener("submit", function (e) {
  const validation = validateForm();

  if (!isValid(validation)) {
    e.preventDefault();

    // Highlight all invalid fields
    Object.keys(validation).forEach(key => {
      if (!validation[key]) {
        const el = document.getElementById(key);

        if (el) {
          setInvalid(el);
        } else {
          // Handle fieldsets
          if (key === "complaints-group") {
            setInvalid(document.getElementById("complaints-group"));
          }
          if (key === "solutions-group") {
            setInvalid(document.getElementById("solutions-group"));
          }
        }
      }
    });
  }
});

// Initialize
setupValidation();