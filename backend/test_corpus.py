import io
import json
import os
import unittest
from unittest.mock import patch
import corpus

class CorpusTests(unittest.TestCase):
    def setUp(self):
        corpus._cache = []
        corpus._expires = 0
        self.env = patch.dict(os.environ, {'SANITY_PROJECT_ID': 'example', 'SANITY_DATASET': 'production'})
        self.env.start()
        self.addCleanup(self.env.stop)

    def test_unpublish_removes_cached_answer_after_ttl(self):
        answer = {'question': 'Python projects', 'shortAnswer': 'GNSS'}
        with patch('corpus.time.monotonic', return_value=1), patch('corpus.urlopen', return_value=io.BytesIO(json.dumps({'result': [answer]}).encode())) as fetch:
            self.assertEqual(corpus.load_corpus(), [answer])
            self.assertIn('perspective=published', fetch.call_args.args[0])
        with patch('corpus.time.monotonic', return_value=602), patch('corpus.urlopen', return_value=io.BytesIO(b'{"result":[]}')):
            self.assertEqual(corpus.load_corpus(), [])

    def test_outage_does_not_keep_expired_content(self):
        corpus._cache = [{'question': 'Old', 'shortAnswer': 'Unpublished'}]
        with patch('corpus.urlopen', side_effect=OSError('Offline')):
            self.assertEqual(corpus.load_corpus(), [])

    def test_five_queries_match_expected_faq(self):
        docs = [{'question': q, 'shortAnswer': q} for q in ['Python projects', 'Internship availability', 'Contact email', 'Education degree', 'Source code repositories']]
        for question in ['Which Python projects?', 'Internship availability?', 'Contact email please', 'Education degree?', 'Source code repositories?']:
            self.assertIsNotNone(corpus.retrieve(question, docs))

    def test_unsafe_source_is_rejected(self):
        self.assertIsNone(corpus.safe_url('javascript:alert(1)'))
