const core = require("@aws-cdk/core")
const s3 = require("@aws-cdk/aws-s3")

class SmorgStack extends core.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    new s3.Bucket(this, 'BrandLogos', {
      versioned: true,
      removalPolicy: core.RemovalPolicy.DESTROY,
      accessControl: 'Private',
      publicReadAccess: false,
      cors: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'POST'],
          allowedOrigins: ['*'],
        },
      ],
    });
  }
}

module.exports = { SmorgStack };
