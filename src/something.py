import tensorflow as tf
from google.protobuf.json_format import MessageToJson


try:
    record_path = '/home/max/projects/jupyterlab_max_xkcd/sample_record.record'

    record_iterator = tf.python_io.tf_record_iterator(path=record_path)

    all_features = []
    for str_record in record_iterator:
        example = tf.train.Example()
        example.ParseFromString(str_record)
        features = str(example.features)
        # features = MessageToJson(example.features)
        all_features.append(features)

    print("\\n".join(all_features))

except:
    print('Failed to read record')

# dataset = tf.data.TFRecordDataset(record_path)

# dataset = tf.data.Dataset.from_tensor_slices(
#   {"a": tf.random_uniform([4]),
#    "b": tf.random_uniform([4, 100], maxval=100, dtype=tf.int32)})

# dataset = dataset.repeat()

# print(dataset.__dict__)
# print(dataset.output_types)
# print(dataset.output_shapes)

# iterator = dataset.make_initializable_iterator()

# sess = tf.Session()
# sess.run(iterator.initializer)

# tensor = iterator.get_next()
# print(sess.run(tensor))