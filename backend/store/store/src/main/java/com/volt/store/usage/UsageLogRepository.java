package com.volt.store.usage;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsageLogRepository extends MongoRepository<UsageLog, String> {
}
