---
title: Infrastructure as Code
parent: DevOps
has_children: true
has_toc: false
nav_order: 4
---

# Infrastructure as Code

Cloud computing offers virtualised resources, such as servers, storage, and networks, that can be 
provisioned on demand, making infrastructure flexible and scalable. Infrastructure as Code (IaC) 
leverages this flexibility by allowing infrastructure to be defined, managed, and deployed using code, 
enabling cloud resources to be set up, modified, or destroyed with a high degree of automation and 
consistency.

In cloud environments, IaC allows developers and operations teams to automate the creation and management of 
resources like virtual machines, databases, load balancers, and networking components. This is especially 
beneficial in cloud computing, where resources can be easily provisioned and configured via API calls. With 
IaC, these configurations are scripted in code (often using 
[YAML](https://www.cloudbees.com/blog/yaml-tutorial-everything-you-need-get-started), 
[JSON](https://stackoverflow.blog/2022/06/02/a-beginners-guide-to-json-the-data-format-for-the-internet/), 
or proprietary syntax depending on the IaC tool), enabling teams to version, test, and reuse infrastructure 
setups. When IaC files are stored in a version control system, like Git, teams gain the benefits of 
versioning, rollback capabilities, and collaborative workflows, similar to those used in software development.

IaC allows teams to take full advantage of the cloud’s scalability by automating the deployment of 
resources in response to application demands. Secondly, IaC promotes consistency across environments 
(e.g., development, testing, and production) by ensuring that each environment is configured identically, 
minimising “configuration drift” and reducing potential errors. Cloud providers like AWS, Azure, and 
Google Cloud offer their own IaC tools — AWS CloudFormation, Azure Resource Manager, and Google Cloud 
Deployment Manager, respectively — that integrate directly with their services, making it easy to automate 
and manage infrastructure entirely within the cloud.

Overall, IaC enables the repeatable, scalable, and consistent management of cloud infrastructure, aligning 
well with DevOps practices and supporting agile, iterative development in cloud environments. By defining 
infrastructure as code, teams can leverage the flexibility of the cloud to deploy and scale applications 
quickly, efficiently, and with minimal manual intervention. Tools like 
[Terraform](https://www.terraform.io/), [Ansible](https://www.ansible.com/), and 
[AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html) allow 
teams to automate the provisioning and updating of infrastructure as part of their CI/CD pipelines. For 
example, a pipeline can automatically spin up new environments for testing or scale resources up and down 
based on usage, enabling rapid responses to changing application needs. This automation not only accelerates 
the setup of complex environments but also improves efficiency, as infrastructure changes can be applied 
rapidly and consistently without requiring manual intervention.

Another significant benefit of IaC in DevOps is that it facilitates version control and collaboration. 
Because infrastructure is defined as code, it can be stored in repositories alongside application code, 
allowing teams to review, approve, and track changes in the same way they would for software updates. This 
transparency improves communication between developers and operations, aligns infrastructure with 
application requirements, and enables rollbacks if a change introduces issues, enhancing reliability and 
resilience.

In summary, IaC enables DevOps teams to treat infrastructure as a flexible, versionable component of their 
software delivery process. It enhances consistency, supports automation, fosters collaboration, and enables 
rapid scaling, all of which are central to achieving the agility, efficiency, and reliability that DevOps 
aims to bring to software development and operations.

## Example

The example below uses AWS CloudFormation to create a scalable environment for a C# application. In this 
example, we use CloudFormation to define an 
[Elastic Load Balancer](https://aws.amazon.com/elasticloadbalancing/) (ELB), an 
[Auto Scaling Group](https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-groups.html), and an 
[Amazon RDS database](https://aws.amazon.com/rds/) instance, allowing the application to scale automatically 
based on demand.

### AWS CloudFormation Template

This CloudFormation template provisions resources necessary for a C# application to be scalable and 
robust. The application runs on [EC2 instances](https://aws.amazon.com/pm/ec2/), which are automatically 
scaled based on CPU usage. It includes an Application Load Balancer (ALB) to distribute traffic and an 
RDS database to handle persistent data storage.

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Description: Scalable C# Application Environment

Parameters:
  KeyName:
    Type: String
    Description: Name of an existing EC2 KeyPair to SSH into instances

Resources:
  # Security Group for EC2 Instances
  AppSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow HTTP and SSH access
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0

  # Application Load Balancer
  LoadBalancer:
    Type: AWS::ElasticLoadBalancingV2::LoadBalancer
    Properties:
      Name: CSharpAppALB
      Scheme: internet-facing
      Subnets: 
        - subnet-abc123  # replace with actual subnet IDs
        - subnet-def456
      SecurityGroups:
        - !Ref AppSecurityGroup

  LoadBalancerTargetGroup:
    Type: AWS::ElasticLoadBalancingV2::TargetGroup
    Properties:
      Name: CSharpAppTargetGroup
      Port: 80
      Protocol: HTTP
      VpcId: vpc-123456  # replace with actual VPC ID
      HealthCheckPath: /
      TargetType: instance

  LoadBalancerListener:
    Type: AWS::ElasticLoadBalancingV2::Listener
    Properties:
      LoadBalancerArn: !Ref LoadBalancer
      Port: 80
      Protocol: HTTP
      DefaultActions:
        - Type: forward
          TargetGroupArn: !Ref LoadBalancerTargetGroup

  # Auto Scaling Group for C# application instances
  AppAutoScalingGroup:
    Type: AWS::AutoScaling::AutoScalingGroup
    Properties:
      VPCZoneIdentifier: 
        - subnet-abc123  # replace with actual subnet IDs
        - subnet-def456
      LaunchConfigurationName: !Ref AppLaunchConfig
      MinSize: 1
      MaxSize: 5
      TargetGroupARNs:
        - !Ref LoadBalancerTargetGroup
      HealthCheckType: ELB
      HealthCheckGracePeriod: 300

  AppScalingPolicy:
    Type: AWS::AutoScaling::ScalingPolicy
    Properties:
      AutoScalingGroupName: !Ref AppAutoScalingGroup
      PolicyType: TargetTrackingScaling
      TargetTrackingConfiguration:
        PredefinedMetricSpecification:
          PredefinedMetricType: ASGAverageCPUUtilization
        TargetValue: 50.0  # Scale up if CPU is above 50%

  # Launch Configuration for EC2 Instances
  AppLaunchConfig:
    Type: AWS::AutoScaling::LaunchConfiguration
    Properties:
      ImageId: ami-0abcdef12345abcdef  # replace with the relevant AMI ID for Windows/Linux
      InstanceType: t2.micro
      KeyName: !Ref KeyName
      SecurityGroups:
        - !Ref AppSecurityGroup
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          # Install .NET SDK or ASP.NET runtime as needed
          # Command to download and run your C# application here
          
  # RDS Database for application
  AppDatabase:
    Type: AWS::RDS::DBInstance
    Properties:
      DBInstanceClass: db.t2.micro
      Engine: MySQL  # or SQL Server for C# compatibility
      MasterUsername: admin
      MasterUserPassword: Password1234  # Use AWS Secrets Manager in production
      AllocatedStorage: 20
      PubliclyAccessible: false
      BackupRetentionPeriod: 7
      MultiAZ: true
```

### Explanation of Key Components

1. **Security Group**: Configures network rules to allow HTTP (port 80) and SSH (port 22) access, 
   providing basic security for incoming traffic to the EC2 instances.

2. **Application Load Balancer (ALB)**: Distributes incoming HTTP traffic across multiple EC2 instances, 
   ensuring the application remains responsive as traffic scales.

3. **Auto Scaling Group (ASG)**: Manages the EC2 instances running the C# application, automatically 
   scaling up or down based on CPU utilisation (targeted at 50% here). This configuration helps the 
   application handle variable loads efficiently.

4. **Scaling Policy**: Tied to the ASG, this policy scales the application horizontally by adding or 
   removing instances based on CPU usage, allowing it to meet demand dynamically.

5. **Launch Configuration**: Specifies the EC2 instance type, AMI (Amazon Machine Image) ID, and initial 
   setup script (such as commands to install the .NET runtime and run the C# application). It ensures that 
   each instance launched by the ASG is configured correctly.

6. **RDS Database**: Provisions a MySQL database (or other compatible databases such as SQL Server for 
   .NET applications), providing a persistent data storage layer for the application. The database is not 
   publicly accessible to improve security, and it has automated backups for resilience.

Using AWS CloudFormation as IaC enables a consistent, repeatable setup for infrastructure. The entire 
application environment, including load balancing, scaling, and database, is defined as code, making it 
easy to deploy and manage infrastructure in a DevOps pipeline. This approach aligns well with DevOps 
principles, as it reduces manual intervention, improves infrastructure reliability, and supports rapid 
changes in response to demand, which can be especially helpful in CI/CD workflows. If demand spikes, for 
example, the ASG can automatically add more EC2 instances, ensuring that the C# application remains 
available and responsive. This example illustrates how CloudFormation can help automate infrastructure 
provisioning, scaling, and deployment to support agile, DevOps-driven development.

