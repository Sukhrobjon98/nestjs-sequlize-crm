import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './model/invoice.model';
import { Payment } from './model/payment.model';
import { PaymentService } from './payment.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Payment]),
        SequelizeModule.forFeature([Invoice]),
    ],
    providers: [PaymentService],
    exports: [PaymentService],
})
export class PaymentModule {}
