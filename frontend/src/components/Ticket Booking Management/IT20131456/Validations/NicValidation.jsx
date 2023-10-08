//NIC Validation

//Check enterd NIC is available in the database

export const validateNIC = (enteredNIC) => {
    const NIC = 200025302080;
    if (enteredNIC === NIC) {
      return { success: "NIC Validated Successfully", error: "" };
    } else {
      return { error: "User Not Found", success: "" };
    }
  };
  

//Check how many reservation are avilable on the same NIC (Its must be at least 4 reservation on the same NIC)



