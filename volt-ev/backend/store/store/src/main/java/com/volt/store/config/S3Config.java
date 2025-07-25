package com.volt.store.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config{

    @Value("${aws.region}")
    private String region;
    @Value("${aws.accesskey}")
    private String accessKey;
    @Value("${aws.secretkey}")
    private String secretKey;

    @Bean
    public S3Client s3Client(){
        Region region = Region.of(this.region);
        AwsBasicCredentials creds = AwsBasicCredentials.create(accessKey, secretKey);

        return S3Client
                .builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider.create(creds))
                .build();
    }
    @Bean
    public S3Presigner s3Presigner(){
        Region region = Region.of(this.region);

        return S3Presigner
                .builder()
                .region(region)
                .credentialsProvider(StaticCredentialsProvider
                        .create(AwsBasicCredentials.create(this.accessKey, this.secretKey)))
                .build();
    }
}
