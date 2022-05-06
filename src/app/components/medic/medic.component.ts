import { Component, OnInit } from '@angular/core';
import { Establishment } from 'src/app/models/Estableishment';
import { User } from 'src/app/models/User';
import { EstableishmentService } from 'src/app/services/establishment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.css']
})
export class MedicComponent implements OnInit {

  user: User;
  userModal: User;
  users: User[] = [];
  establishments: Establishment[] = [];

  constructor(private userService: UserService, private establishmentService: EstableishmentService) {
    this.user = new User();
    this.userModal = new User();
  }

  ngOnInit(): void {
    this.getAllMedics();
    this.getEstablishments();
  }

  getEstablishments() {
    this.establishmentService.getEstableishments().subscribe(
      data => this.establishments = data,
      err => console.error(err)
    );
  }

  getAllMedics() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      err => console.error(err),
    );
  }

  onSubmit() {
    if (!this.user.id) {
      this.userService.createUser(this.user).subscribe(
        () => this.getAllMedics(),
        (err) => console.error(err)
      );
    } else {
      this.userService.updateUser(this.user).subscribe(
        () => this.getAllMedics(),
        (err) => console.error(err)
      );
    }
    this.user = new User();
  }

  handleEdit(selectedUser: User) {
    if (this.user.id) {
      this.user = new User();
    } else {
      this.user.id = selectedUser.id;
      this.user.firstName = selectedUser.firstName;
      this.user.lastName = selectedUser.lastName;
      this.user.documentNumber = selectedUser.documentNumber;
      this.user.documentMedic = selectedUser.documentMedic;
      this.user.gender = selectedUser.gender;
      this.user.profession = selectedUser.profession;
      this.user.employeeStatus = selectedUser.employeeStatus;
      this.user.workingCondition = selectedUser.workingCondition;
    }
  }

  deleteUser(id: number) {
    if (confirm('¿Esta seguro de eliminar el item?')) {
      this.userService.deleteUser(id).subscribe(
        () => this.getAllMedics(),
        (err) => console.error(err)
      );
    }
  }

  onClickModal(selectedUser: User) {
    this.userModal = selectedUser;
    this.userService.getCredentials(selectedUser.id!).subscribe(
      data => this.userModal.password = data.password,
      err => console.error(err)
    );
  }

}
