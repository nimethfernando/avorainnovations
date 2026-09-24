// Prisma 7 configuration file
export default {
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'mysql://root:password@localhost:3306/avorainnovations',
  },
};
