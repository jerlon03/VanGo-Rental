import Swal from 'sweetalert2';


const SweetAlert = {
  showError: (message: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${message}`,
        confirmButtonText: 'Try Again'
    });
  },
  showSuccess: (message:string) => {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `${message}`,
        confirmButtonText: 'Continue'
    });   
  },
  showConfirm: (message:string) => {
    Swal.fire({
        title: 'Are you sure?',
        text: `${message}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: `${message}`,
                confirmButtonText: 'Continue'
            }); 
        }
    });
      
  }
 
};

export default SweetAlert;