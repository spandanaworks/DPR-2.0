// main.js - Complete working version

document.addEventListener("DOMContentLoaded", function () {
    console.log("DPR Generator loaded successfully!");
    
    // ==================== SECTION NAVIGATION ====================
    const sections = document.querySelectorAll(".dpr-section");
    const nextButtons = document.querySelectorAll(".next-btn");
    const progressBar = document.getElementById("progress-bar");
    const totalSections = sections.length;
    let currentSection = 0;

    // Show the first section
    if (sections.length > 0) {
        showSection(currentSection);
    }

    // Function to show a section
    function showSection(index) {
        sections.forEach((sec, i) => {
            sec.style.display = i === index ? "block" : "none";
        });
        updateProgress(index);
        
        // Update active state in sidebar
        const sidebarLinks = document.querySelectorAll("#sidebar-nav .nav-link");
        sidebarLinks.forEach((link, i) => {
            if (i === index) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
        
        // Scroll to top of content
        document.querySelector('.content').scrollTop = 0;
    }

    // Update progress bar
    function updateProgress(index) {
        const step = index + 1;
        const percent = Math.round((step / totalSections) * 100);
        if (progressBar) {
            progressBar.style.width = percent + "%";
            progressBar.textContent = `Step ${step}/${totalSections}`;
        }
    }

    // Next button click handler
    nextButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (currentSection < totalSections - 1) {
                currentSection++;
                showSection(currentSection);
            }
        });
    });

    // ==================== SECTION 2: DYNAMIC MEMBERS TABLE ====================
    const addMemberBtn = document.getElementById("add-member");
    const membersContainer = document.getElementById("members-container");
    let memberCount = 0;

    function createMemberRow(id) {
        const tr = document.createElement("tr");
        tr.setAttribute("data-member-id", id);
        tr.innerHTML = `
            <td class="member-sno">${id}</td>
            <td><input type="text" name="member_name_${id}" class="form-control form-control-sm member-name" placeholder="Full Name"></td>
            <td><input type="text" name="member_role_${id}" class="form-control form-control-sm member-role" placeholder="Role/Designation"></td>
            <td><input type="number" name="member_age_${id}" class="form-control form-control-sm member-age" placeholder="Age"></td>
            <td>
                <select name="member_gender_${id}" class="form-select form-select-sm member-gender">
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </td>
            <td><input type="text" name="member_qualification_${id}" class="form-control form-control-sm member-qualification" placeholder="Educational Qualification"></td>
            <td><input type="text" name="member_id_type_${id}" class="form-control form-control-sm member-id-type" placeholder="ID Proof Type"></td>
            <td><input type="text" name="member_id_number_${id}" class="form-control form-control-sm member-id-number" placeholder="ID Proof Number"></td>
            <td><input type="text" name="member_mobile_${id}" class="form-control form-control-sm member-mobile" placeholder="Mobile Number"></td>
            <td><input type="file" name="member_photo_${id}" class="form-control form-control-sm member-photo" accept="image/*"></td>
            <td><input type="file" name="member_id_proof_${id}" class="form-control form-control-sm member-id-proof" accept="image/*,.pdf"></td>
            <td><button type="button" class="btn btn-danger btn-sm remove-member">Remove</button></td>
        `;
        return tr;
    }

    if (addMemberBtn && membersContainer) {
        // Add initial member
        addMemberBtn.click();
        
        addMemberBtn.addEventListener("click", () => {
            memberCount++;
            const newRow = createMemberRow(memberCount);
            membersContainer.appendChild(newRow);
            
            // Attach remove listener
            newRow.querySelector(".remove-member").addEventListener("click", () => {
                newRow.remove();
                updateMemberNumbers();
            });
        });
    }

    function updateMemberNumbers() {
        const rows = membersContainer.querySelectorAll("tr");
        rows.forEach((row, index) => {
            const snoCell = row.querySelector(".member-sno");
            if (snoCell) {
                snoCell.textContent = index + 1;
            }
            row.setAttribute("data-member-id", index + 1);
        });
    }

    // ==================== SECTION 7: FINANCIAL ESTIMATES AUTO-CALCULATION ====================
    function setupFinancialCalculations() {
        const costInputs = document.querySelectorAll("#section7 .project-cost");
        const totalCostField = document.getElementById("total-cost");
        const loanInput = document.getElementById("bank-loan");
        const ownInput = document.getElementById("own-contribution");
        const subsidyInput = document.getElementById("subsidy");
        const totalFundsField = document.getElementById("total-funds");

        function calculateTotalCost() {
            let sum = 0;
            costInputs.forEach(input => {
                sum += Number(input.value) || 0;
            });
            if (totalCostField) totalCostField.value = sum;
            return sum;
        }

        function calculateTotalFunds() {
            let sum = 0;
            if (loanInput) sum += Number(loanInput.value) || 0;
            if (ownInput) sum += Number(ownInput.value) || 0;
            if (subsidyInput) sum += Number(subsidyInput.value) || 0;
            if (totalFundsField) totalFundsField.value = sum;
            return sum;
        }

        costInputs.forEach(input => {
            input.addEventListener("input", () => {
                calculateTotalCost();
                calculateTotalFunds();
            });
        });
        
        if (loanInput) loanInput.addEventListener("input", calculateTotalFunds);
        if (ownInput) ownInput.addEventListener("input", calculateTotalFunds);
        if (subsidyInput) subsidyInput.addEventListener("input", calculateTotalFunds);

        calculateTotalCost();
        calculateTotalFunds();
    }
    setupFinancialCalculations();

    // ==================== SECTION 3: SEASONAL VARIATION ====================
    function setupSeasonalVariation() {
        const seasonalRadios = document.querySelectorAll("#section3 input[name='seasonal']");
        const offSeasonDiv = document.querySelector("#section3 .mb-2:last-of-type");
        
        function toggleOffSeasonDays() {
            const selected = document.querySelector("#section3 input[name='seasonal']:checked");
            if (offSeasonDiv) {
                offSeasonDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
            }
        }
        
        seasonalRadios.forEach(radio => radio.addEventListener("change", toggleOffSeasonDays));
        toggleOffSeasonDays();
    }
    setupSeasonalVariation();

    // ==================== SECTION 9: WORKSPACE CONDITIONAL ====================
    function setupWorkspaceFields() {
        const workspaceRadios = document.querySelectorAll("#section9 input[name='workspace']");
        const statusDiv = document.querySelector("#section9 .mb-2:nth-of-type(2)");
        const rentDiv = document.querySelector("#section9 .mb-2:nth-of-type(3)");
        
        function toggleWorkspace() {
            const selected = document.querySelector("#section9 input[name='workspace']:checked");
            const show = selected && selected.value === "yes";
            if (statusDiv) statusDiv.style.display = show ? "block" : "none";
            if (rentDiv) rentDiv.style.display = show ? "block" : "none";
        }
        
        workspaceRadios.forEach(radio => radio.addEventListener("change", toggleWorkspace));
        toggleWorkspace();
    }
    setupWorkspaceFields();

    // ==================== SECTION 11: ECO AND TRAINING ====================
    function setupSocialFields() {
        // Eco-friendly
        const ecoRadios = document.querySelectorAll("#section11 input[name='eco_friendly']");
        const ecoDiv = document.querySelector("#section11 .mb-2:nth-of-type(5)");
        
        function toggleEco() {
            const selected = document.querySelector("#section11 input[name='eco_friendly']:checked");
            if (ecoDiv) ecoDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
        }
        
        // Training
        const trainingRadios = document.querySelectorAll("#section11 input[name='training']");
        const trainingDiv = document.querySelector("#section11 .mb-2:last-of-type");
        
        function toggleTraining() {
            const selected = document.querySelector("#section11 input[name='training']:checked");
            if (trainingDiv) trainingDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
        }
        
        ecoRadios.forEach(radio => radio.addEventListener("change", toggleEco));
        trainingRadios.forEach(radio => radio.addEventListener("change", toggleTraining));
        toggleEco();
        toggleTraining();
    }
    setupSocialFields();

    // ==================== SECTION 14: GST AND UDYAM ====================
    function setupGSTUdyam() {
        // GST
        const gstRadios = document.querySelectorAll("#section14 input[name='gst']");
        const gstDiv = document.querySelector("#section14 .mb-2:nth-of-type(6)");
        
        function toggleGST() {
            const selected = document.querySelector("#section14 input[name='gst']:checked");
            if (gstDiv) gstDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
        }
        
        // Udyam
        const udyamRadios = document.querySelectorAll("#section14 input[name='udyam']");
        const udyamDiv = document.querySelector("#section14 .mb-2:nth-of-type(8)");
        
        function toggleUdyam() {
            const selected = document.querySelector("#section14 input[name='udyam']:checked");
            if (udyamDiv) udyamDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
        }
        
        gstRadios.forEach(radio => radio.addEventListener("change", toggleGST));
        udyamRadios.forEach(radio => radio.addEventListener("change", toggleUdyam));
        toggleGST();
        toggleUdyam();
    }
    setupGSTUdyam();

    // ==================== SECTION 15: LOAN HISTORY ====================
    function setupLoanHistory() {
        const loanBeforeRadios = document.querySelectorAll("#section15 input[name='loan_before']");
        const loanDetailsDiv = document.querySelector("#section15 .mb-2:nth-of-type(2)");
        const defaultsDiv = document.querySelector("#section15 .mb-2:nth-of-type(3)");
        const defaultsExplainDiv = document.querySelector("#section15 .mb-2:nth-of-type(4)");
        
        function toggleLoanFields() {
            const selected = document.querySelector("#section15 input[name='loan_before']:checked");
            const show = selected && selected.value === "yes";
            if (loanDetailsDiv) loanDetailsDiv.style.display = show ? "block" : "none";
            if (defaultsDiv) defaultsDiv.style.display = show ? "block" : "none";
            if (!show && defaultsExplainDiv) defaultsExplainDiv.style.display = "none";
        }
        
        const defaultsRadios = document.querySelectorAll("#section15 input[name='loan_defaults']");
        function toggleDefaultsExplain() {
            const selected = document.querySelector("#section15 input[name='loan_defaults']:checked");
            if (defaultsExplainDiv) {
                defaultsExplainDiv.style.display = (selected && selected.value === "yes") ? "block" : "none";
            }
        }
        
        loanBeforeRadios.forEach(radio => radio.addEventListener("change", toggleLoanFields));
        defaultsRadios.forEach(radio => radio.addEventListener("change", toggleDefaultsExplain));
        toggleLoanFields();
    }
    setupLoanHistory();

    // ==================== SECTION 13: SET DATE AUTOMATICALLY ====================
    const dateInput = document.getElementById("declaration-date");
    if (dateInput && !dateInput.value) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    // ==================== SIDEBAR NAVIGATION ====================
    const sidebarLinks = document.querySelectorAll("#sidebar-nav .nav-link");
    sidebarLinks.forEach((link, idx) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const href = link.getAttribute("href");
            if (href && href.startsWith("#section")) {
                const sectionId = href.substring(1);
                const targetSection = document.getElementById(sectionId);
                if (targetSection) {
                    const sectionIndex = Array.from(sections).indexOf(targetSection);
                    if (sectionIndex !== -1) {
                        currentSection = sectionIndex;
                        showSection(currentSection);
                    }
                }
            }
        });
    });

    // ==================== FORM SUBMISSION ====================
    const dprForm = document.getElementById("dpr-form");
    if (dprForm) {
        dprForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(dprForm);
            let formSummary = "📋 DPR Form Data Summary:\n\n";
            
            for (let [key, value] of formData.entries()) {
                if (typeof value === "string" && value.length > 0 && 
                    !key.includes("file") && !key.includes("photo") && !key.includes("proof")) {
                    if (!formSummary.includes(`${key}:`)) {
                        formSummary += `${key}: ${value}\n`;
                    }
                }
            }
            
            // Count members
            const memberRows = membersContainer ? membersContainer.querySelectorAll("tr").length : 0;
            formSummary += `\n👥 Total Members Added: ${memberRows}`;
            
            // Get total project cost
            const totalCost = document.getElementById("total-cost")?.value;
            if (totalCost && totalCost > 0) {
                formSummary += `\n💰 Total Project Cost: ₹${totalCost}`;
            }
            
            console.log("Form submitted successfully!");
            console.log("Form Data:", Object.fromEntries(formData));
            
            alert("✅ DPR submitted successfully!\n\n" + formSummary.substring(0, 600));
        });
    }
    
    console.log("All features initialized successfully!");
});