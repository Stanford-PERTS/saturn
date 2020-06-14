import whenLearningCondition from './whenLearningCondition';

// Note: Triton refers to learning conditions as "metrics" in some places
// internally but Neptune portal sets them as "learning_conditions". This is
// an alias for those that prefer "metric" over "learning conditions".

const whenMetric = whenLearningCondition;

export default whenMetric;
