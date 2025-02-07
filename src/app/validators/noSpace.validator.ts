import { AbstractControl, FormControl } from "@angular/forms"; 

export class customValidator{
    static noSpaceAllowed (control: FormControl) {
        if(control.value != null && control.value.indexOf(' ') != -1){
            return { noSpaceAllowed: true}
        }
        return null;
    }
    static checkUserName(control: AbstractControl): Promise<any>{
       return userNameAllowed(control.value)
    }
}

function userNameAllowed(username: string){
    const takenUsername = ['tariq', 'rehmat', 'asad']
    return new Promise((resolve, reject) => {   
        setTimeout(() => {
            if(takenUsername.includes(username)){
                resolve({checkUsername: true})
            }else{
                resolve (null)
            }
        }, 3000);
    })
}