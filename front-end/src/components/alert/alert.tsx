import Swal from 'sweetalert2';

const SweetAlert = {
  showError: (message: string) => {
    Swal.fire({
      icon: 'error',
      title: 'ERROR!',
      text: `${message}`,
      confirmButtonText: 'Try Again'
    });
  },
  showSuccess: (message: string) => {
    Swal.fire({
      icon: 'success',
      title: 'SUCCESS!',
      text: `${message}`,
      confirmButtonText: 'Continue'
    });
  },
  showConfirm: (message: string): Promise<boolean> => {
    return new Promise((resolve) => {
      Swal.fire({
        text: `${message}`,
        icon: 'warning',
        title: 'CONFIRMATION!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel'
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },
  showInfo: (message: string) => {
    Swal.fire({
      icon: 'info',
      title: 'INFORMATION',
      text: `${message}`,
      confirmButtonText: 'OK'
    });
  },
  showWarning: (message: string) => {
    Swal.fire({
      icon: 'warning',
      title: 'WARNING!',
      text: `${message}`,
      confirmButtonText: 'Continue'
    });
  }
};

export default SweetAlert;
