# Open Music API Queue Consumer

## Prerequisites

- [Node.js](https://nodejs.org/) (v12 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/mrsyafapri/openmusic-api-queue-consumer.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd openmusic-api-queue-consumer
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running the Application

1. Start the application:
   ```bash
   npm start
   ```
2. Access the application:

   Open your browser and go to http://localhost:5000

## Configuration

Create a `.env` file in the root directory and add your configuration:

```env
# node-postgres configuration
PGUSER=your_pg_user
PGHOST=your_pg_host
PGPASSWORD=your_pg_password
PGDATABASE=your_pg_database
PGPORT=your_pg_port

# nodemailer SMTP authentication
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password

# Message broker
RABBITMQ_SERVER=your_rabbitmq_server
```
