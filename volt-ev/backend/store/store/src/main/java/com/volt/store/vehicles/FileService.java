package com.volt.store.vehicles;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.Request;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class FileService {

    @Value("${aws.bucket}")
    private String bucket;

    private final S3Presigner s3Presigner;
    private final S3Client s3Client;

    public String generateUrl(String filename){
        GetObjectRequest filebuild
                = GetObjectRequest.builder()
                .bucket(bucket)
                .key(filename).build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest
                .builder()
                .getObjectRequest(filebuild)
                .signatureDuration(Duration.ofMinutes(10))
                .build();

        return s3Presigner
                .presignGetObject(presignRequest)
                .url()
                .toString();
    }

    public void uploadFile(MultipartFile file, String accesstype) throws IOException {
        try(InputStream inputStream = file.getInputStream()){
            PutObjectRequest req = PutObjectRequest
                    .builder()
                    .bucket(bucket)
                    .key(file.getName())
                    .build();

            RequestBody requestBody = RequestBody.fromInputStream(inputStream, file.getSize());

            s3Client.putObject(req, requestBody);
        }
    }
}
