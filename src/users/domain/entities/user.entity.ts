export type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
};

export class UserEntity {
  constructor(private props: UserProps) {
    this.props.createdAt = this.props.createdAt ?? new Date();
  }
}
