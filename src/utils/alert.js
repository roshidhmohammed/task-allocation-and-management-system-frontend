import Swal from "sweetalert2";

export const alert = {
  success: (message) => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
      confirmButtonText: "OK",
    });
  },

  error: (message) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
      confirmButtonText: "OK",
    });
  },

  warning: (message) => {
    Swal.fire({
      icon: "warning",
      title: "Warning",
      text: message,
      confirmButtonText: "OK",
    });
  },

  info: (message) => {
    Swal.fire({
      icon: "info",
      title: "Info",
      text: message,
      confirmButtonText: "OK",
    });
  },

  confirm: async (message) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    return result.isConfirmed;
  },
};