import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'externalId', type: 'uuid', unique: true, nullable: true })
  externalId: string;

  @Column({ name: 'accountExternalIdDebit', type: 'uuid' })
  accountExternalIdDebit: string;

  @Column({ name: 'accountExternalIdCredit', type: 'uuid' })
  accountExternalIdCredit: string;

  @Column({ name: 'tranferTypeId', type: 'integer' })
  tranferTypeId: number;

  @Column({ name: 'transactionStatusId', type: 'integer' })
  transactionStatusId: number;

  @Column({ name: 'transactionValue', type: 'decimal' })
  transactionValue: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;
}
