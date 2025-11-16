import type { User } from '@/interfaces/user.interface';

export const users: User[] = [
  {
    id: '1',
    name: 'Theresa Webb',
    email: 'demo@example.com',
    password: 'password123',
    imageUrl: 'https://picsum.photos/id/64/200',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'test@user.com',
    password: 'testpass',
    imageUrl: 'https://picsum.photos/id/550/200',
  },
];

export default users;
