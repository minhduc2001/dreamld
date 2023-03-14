// import {
//   registerDecorator,
//   ValidationArguments,
//   ValidationOptions,
// } from 'class-validator';
//
// import * as exc from '@base/api/exception.reslover';
// import { removeFile } from '@base/helper/file.helper';
//
// interface IsFileOptions {
//   mime: ('image/jpg' | 'image/png' | 'image/jpeg')[];
// }
//
// export function IsFiles(
//   options: IsFileOptions,
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object, propertyName: string) {
//     return registerDecorator({
//       name: 'isFile',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: {
//         validate(files: any[], args: ValidationArguments) {
//           for (const file of files) {
//             if (
//               file?.mimetype &&
//               (options?.mime ?? []).includes(file?.mimetype)
//             ) {
//               continue;
//             }
//             throw new exc.UnsupportedMediaType({
//               message: `unsupported file type ${file?.mimetype}`,
//             });
//           }
//           return true;
//         },
//       },
//     });
//   };
// }
//
// export function IsFile(
//   options: IsFileOptions,
//   validationOptions?: ValidationOptions,
// ) {
//   return function (object, propertyName: string) {
//     return registerDecorator({
//       name: 'isFile',
//       target: object.constructor,
//       propertyName: propertyName,
//       constraints: [],
//       options: validationOptions,
//       validator: {
//         validate(value: any, args: ValidationArguments) {
//           if (
//             value?.mimetype &&
//             (options?.mime ?? []).includes(value?.mimetype)
//           ) {
//             return true;
//           }
//           return false;
//         },
//       },
//     });
//   };
// }
