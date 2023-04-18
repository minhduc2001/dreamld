import * as crypto from 'crypto';
import axios from 'axios';
import * as exc from '@base/api/exception.reslover';
import { LoggerService } from '@base/logger';
import { config } from '@/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MomoPaymentService {
  private readonly partnerCode: string;
  private readonly accessKey: string;
  private secretKey: string;
  private readonly environment: string;

  constructor(private readonly loggerService: LoggerService) {
    this.partnerCode = config.PARTNER_CODE;
    this.accessKey = config.ACCESS_KEY;
    this.secretKey = config.SECRET_KEY;
    this.environment = config.ENVIRONMENT;
  }

  private logger = this.loggerService.getLogger(MomoPaymentService.name);

  async createPayment(
    requestId: string,
    orderId: string,
    amount: number,
    orderInfo: string,
    ipnUrl: string,
    extraData = '',
  ) {
    try {
      if (!orderId || !amount || !orderInfo || !ipnUrl) {
        throw new exc.BadException({ message: 'invalid input' });
      }

      const url = this._getURL() + '/create';
      const redirectUrl = 'https://momo.vn/return';
      // ipnUrl = 'https://callback.url/notify';
      const requestType = 'captureWallet';

      const signatureRaw =
        'accessKey=' +
        this.accessKey +
        '&amount=' +
        amount +
        '&extraData=' +
        extraData +
        '&ipnUrl=' +
        ipnUrl +
        '&orderId=' +
        orderId +
        '&orderInfo=' +
        orderInfo +
        '&partnerCode=' +
        this.partnerCode +
        '&redirectUrl=' +
        redirectUrl +
        '&requestId=' +
        requestId +
        '&requestType=' +
        requestType;

      console.log(signatureRaw);

      const signature = crypto
        .createHmac('sha256', this.secretKey)
        .update(signatureRaw)
        .digest('hex');

      const data = {
        partnerCode: this.partnerCode,
        accessKey: this.accessKey,
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        extraData: extraData,
        requestType: requestType,
        signature: signature,
        lang: 'en',
      };

      const res = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        url,
        data,
      });

      return res.data;
    } catch (e) {
      // this.logger.warn(e);
      throw new exc.BadException({ message: e.message });
    }
  }

  // async refundPayment({ requestId, orderId, amount, transId }) {
  //   try {
  //     if (!orderId || !amount || !transId) {
  //       throw new exc.BadException({ message: 'invalid input' });
  //     }
  //
  //     const url = this._getURL();
  //     const signatureRaw = `partnerCode=${this.partnerCode}&accessKey=${this.accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&transId=${transId}&requestType=refundMoMoWallet`;
  //     const signature = crypto
  //       .createHmac('sha256', this.secretKey)
  //       .update(signatureRaw)
  //       .digest('hex');
  //
  //     const res = await axios({
  //       method: 'POST',
  //       headers: { 'content-type': 'application/json' },
  //       url,
  //       data: {
  //         accessKey: this.accessKey,
  //         partnerCode: this.partnerCode,
  //         requestType: 'refundMoMoWallet',
  //         orderId,
  //         amount,
  //         requestId,
  //         transId,
  //         signature,
  //       },
  //     });
  //     return res;
  //   } catch (error) {
  //     console.error('error:', error);
  //     throw error;
  //   }
  // }

  verifySignature({
    signature,
    requestId,
    orderId,
    amount,
    orderInfo,
    orderType,
    transId,
    message,
    localMessage,
    responseTime,
    errorCode,
    payType,
    extraData = '',
  }) {
    try {
      if (
        !requestId ||
        !amount ||
        !orderId ||
        !orderInfo ||
        !orderType ||
        !transId ||
        !message ||
        !localMessage ||
        !responseTime ||
        !errorCode ||
        !payType
      ) {
        throw new Error('invalid input');
      }

      const signatureRaw = `partnerCode=${this.partnerCode}&accessKey=${this.accessKey}&requestId=${requestId}&amount=${amount}&orderId=${orderId}&orderInfo=${orderInfo}&orderType=${orderType}&transId=${transId}&message=${message}&localMessage=${localMessage}&responseTime=${responseTime}&errorCode=${errorCode}&payType=${payType}&extraData=${extraData}`;

      const genSignature = crypto
        .createHmac('sha256', this.secretKey)
        .update(signatureRaw)
        .digest('hex');

      return genSignature === signature;
    } catch (error) {
      throw error;
    }
  }

  private _getURL() {
    if (this.environment === 'sandbox') {
      return 'https://test-payment.momo.vn/v2/gateway/api';
    }

    if (this.environment === 'live') {
      return 'https://payment.momo.vn/';
    }

    return false;
  }
}
