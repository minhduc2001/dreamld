# Welcome to DreamLd!
This is a server component for a mobile application that helps babies sleep better.
Question: Many parents find it difficult to put the baby to sleep. According to child psychologists reading fairy tales is one of the best ways to solve the problem. In fact, new parents often have for new books, and read them every night, because they have a lot of other things to do Of course, there are several apps on the App Store (or Play Market) with audio books, but they want something more than a regular audiobook library. Dreamtales is reimagination of audio fairy tales app for children and their parents. The main aim of the project is getting unigue experience for parents and children. In general, It should be a highly customized, simple to use by children, and beautiful app.
Link design: [Dreamtales-app](https://www.behance.net/gallery/148878593/Dreamtales-app?tracking_source=search_projects%7CDreamtales)
# Init project
Clone branch develop: [https://github.com/minhduc2001/dreamld.git](https://github.com/minhduc2001/dreamld.git)
Base on : [https://github.com/minhduc2001/nest-base](https://github.com/minhduc2001/nest-base)

**Features**:
 -  filter exception
-   log error to file, logger service
-   query data with postgresql
-   authentication, authorization, permission
-   upload file with multer
-   generic service
-   using swagger ui, docker, queue
-   payment momo, cancel overdue payment with redis

**Technology used**:
 - NestJs
 - Typeorm
 - Postgres
 - Redis
 - Docker
 - Swagger
 - Husky(check format, type message pre push code)
 - Git/Github
  
**Requirement**:

 - Node version >= 16
  - Docker
  - Recomment yarn

 
**How to run**
 1.  *Install dependences, touch .env*
In root project:
> $ yarn
> or
> $ npm install

> $ touch .env && cp .env.example .env

 2. *Init environment using docker*

Start docker (postgres, redis)
> $ docker compose up -d
> or
> $ yarn docker:up

 Stop docker
> $ docker compose down
> or
> $ yarn docker:down

 3. *Run project*
 
Run with develop
> yarn start:dev

Run with product
> yarn start:prod

Build
> yarn build

Check lint
> yarn lint

Check prettier
> yarn prettier
> or
> yarn prettier:fix #if u need fix format code.

## Description
### Filter Exception

-   Tính năng "Filter Exception" cho phép xử lý và quản lý các exception trong ứng dụng.
-   Backend cung cấp một bộ lọc (filter) để bắt và xử lý các exception, giúp ứng dụng xử lý các tình huống không mong muốn một cách linh hoạt và kiểm soát được các lỗi xảy ra.

### Log Error to File, Logger Service

-   Tính năng này cho phép ghi lại các lỗi (exceptions) xảy ra trong ứng dụng vào một tệp tin.
-   Backend sử dụng một dịch vụ ghi log (logger service) để thực hiện việc này.
-   Các thông tin lỗi bao gồm thông tin về thời gian xảy ra lỗi, mô tả lỗi và vị trí trong mã nguồn mà lỗi xảy ra.
-   Ghi log các lỗi giúp phân tích và theo dõi các sự cố trong ứng dụng, từ đó giúp tìm ra nguyên nhân và khắc phục các vấn đề một cách nhanh chóng.

### Query Data with PostgreSQL

-   Tính năng này cho phép truy vấn dữ liệu từ cơ sở dữ liệu PostgreSQL.
-   Backend hỗ trợ kết nối và thực hiện các câu truy vấn đến cơ sở dữ liệu.
-   Các câu truy vấn có thể được tùy chỉnh để truy vấn dữ liệu từ các bảng và chỉ mục khác nhau trong cơ sở dữ liệu.
-   Việc truy vấn dữ liệu từ PostgreSQL giúp backend lấy và cung cấp thông tin cần thiết cho ứng dụng, từ đó hỗ trợ các chức năng và nghiệp vụ của ứng dụng.

### Authentication, Authorization, Permission

-   Tính năng này cung cấp các phương thức xác thực (authentication), kiểm soát quyền truy cập (authorization) và kiểm soát quyền hạn (permission) cho ứng dụng.
-   Backend hỗ trợ các phương thức xác thực như xác thực dựa trên mã thông báo (token-based authentication) hoặc xác thực qua tên người dùng và mật khẩu.
-   Các quyền truy cập và quyền hạn của người dùng được xác định và kiểm soát để đảm bảo an toàn và bảo mật trong ứng dụng.
-   Phương thức xác thực giúp xác định danh tính của người dùng và đảm bảo rằng chỉ những người dùng được xác thực mới có thể truy cập vào các tài nguyên và chức năng quan trọng.
-   Kiểm soát quyền truy cập giúp quản lý và kiểm soát các quyền truy cập vào các tài nguyên cụ thể trong ứng dụng, đảm bảo rằng chỉ những người dùng có quyền được cấp mới có thể thực hiện các hoạt động liên quan đến tài nguyên đó.
-   Kiểm soát quyền hạn giúp định rõ các quyền và hạn chế của người dùng, từ đó giới hạn hoạt động và truy cập của họ chỉ trong phạm vi cho phép.

### Upload File with Multer

-   Tính năng này cho phép người dùng tải lên (upload) các tệp tin vào backend.
-   Backend sử dụng thư viện Multer để xử lý việc tải lên tệp tin từ người dùng.
-   Việc tải lên tệp tin giúp người dùng chia sẻ, lưu trữ và quản lý các tệp tin quan trọng trong ứng dụng.

### Generic Service

-   Tính năng dịch vụ chung (generic service) cung cấp một tập hợp các chức năng chung và linh hoạt để xử lý các tác vụ phổ biến trong ứng dụng.
-   Backend cung cấp các phương thức và chức năng tiêu chuẩn để xử lý các tác vụ như tạo, đọc, cập nhật và xóa dữ liệu.
-   Dịch vụ chung cung cấp một giao diện đơn giản để tương tác với các thành phần khác trong ứng dụng và xử lý các yêu cầu chung.

### Using Swagger UI, Docker, Queue

-   Tính năng này hỗ trợ sử dụng Swagger UI để tạo và quản lý tài liệu API.
-   Swagger UI cung cấp một giao diện trực quan để xem và thử nghiệm các API trong ứng dụng.
-   Backend cũng hỗ trợ việc triển khai và chạy ứng dụng bằng Docker, cho phpép dễ dàng xây dựng và triển khai ứng dụng trên nhiều môi trường khác nhau.
-   Docker giúp đóng gói ứng dụng và các thành phần liên quan thành các container độc lập, giúp giảm sự phụ thuộc vào môi trường cài đặt và cung cấp môi trường thực thi đồng nhất.
-   Backend cũng hỗ trợ sử dụng hàng đợi (queue) để xử lý các tác vụ nền (background tasks) một cách bất đồng bộ.
-   Các tác vụ nền có thể được đưa vào hàng đợi để xử lý sau này, giúp giảm thời gian phản hồi và tăng hiệu suất ứng dụng.

### Payment MoMo, Cancel Overdue Payment with Redis

-   Tính năng này cung cấp tích hợp thanh toán sử dụng dịch vụ MoMo.
-   Backend hỗ trợ các phương thức và chức năng cần thiết để xử lý các giao dịch thanh toán qua MoMo API.
-   Các giao dịch thanh toán có thể được thực hiện và xử lý một cách an toàn và đáng tin cậy trong ứng dụng.
-   Backend cũng cung cấp tính năng hủy thanh toán quá hạn bằng cách sử dụng Redis, một hệ thống lưu trữ dữ liệu key-value nhanh và bộ nhớ đệm.
-   Redis được sử dụng để lưu trữ thông tin về các giao dịch thanh toán và cho phép việc hủy thanh toán nhanh chóng và hiệu quả.

### Response
``{
	success:  true,
	errorCode:  '200',
	statusCode:  200,
	message:  '',
	data:  null,
	meta: {},
}``

### List Data
 

 export  class  ListDto {

	@ApiProperty({ required:  false })
	@IsOptional()
	@Transform(({ value }) =>  value  &&  +value)
	@IsNumber()
	page?:  number;
	
	@ApiProperty({ required:  false })
	@IsOptional()
	@Transform(({ value }) =>  value  &&  +value)
	@IsNumber()
	limit?:  number;
	
	@ApiProperty({ required:  false })
	@IsOptional()
	sortBy?: [string, string][];
	
	@ApiProperty({ required:  false })
	@IsOptional()
	searchBy?:  string[];
	
	@ApiProperty({ required:  false })
	@IsOptional()
	search?:  string;
	
	@ApiProperty({ required:  false, type:  'text' })
	@IsOptional()
	filter?: { [column:  string]:  string  |  string[] };
	
	@ApiProperty({ required:  false })
	@IsOptional()
	select?:  string[];
	
	@ApiProperty({ required:  false })
	@IsOptional()
	path:  string;
	}

export  class  Paginated<T> {
	
	data:  T[];
	meta: {
		itemsPerPage:  number;
		totalItems:  number;
		currentPage:  number;
		totalPages:  number;
		sortBy:  SortBy<T>;
		searchBy:  Column<T>[];
		search:  string;
		filter?: { [column:  string]:  string  |  string[] };
		};
	}