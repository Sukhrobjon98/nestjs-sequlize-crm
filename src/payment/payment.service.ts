import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './model/invoice.model';
import { Payment } from './model/payment.model';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Invoice)
    private readonly invoiceModel: typeof Invoice,
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
  ) {}

  async groupInvoices(groupId: number) {
    return await this.invoiceModel.findAll({
      where: { group_id: groupId },
      attributes: ['id', 'amount'],
    });
  }

  async studentInvoices(studentId: number) {
    return await this.invoiceModel.findAll({
      attributes: [
        'id',
        'price',
        'price_with_discount',
        'unpaid',
        'period',
        'created_at',
        'group_id',
      ],
      where: { student_id: studentId },
      include: [
        {
          model: this.paymentModel,
          attributes: ['id', 'amount', 'payment_type', 'created_at'],
        },
      ],
    });
  }
  
  async studentGroupInvoices(studentId: number, groupId: number) {
    return await this.invoiceModel.findAll({
      where: { student_id: studentId, group_id: groupId },
      attributes: ['id', 'price', 'created_at'],
    });
  }
}
