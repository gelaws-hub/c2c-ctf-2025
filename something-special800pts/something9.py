import requests
import time

def test_input_sanitization(url, test_cases):
    """
    Test input field sanitization with common SQL patterns
    Logs results without exploiting vulnerabilities
    """
    results = []
    
    for test_case in test_cases:
        # Add delay to avoid overwhelming server
        time.sleep(1)
        
        # Send test request
        try:
            response = requests.post(url, 
                                   data={'input': test_case},
                                   headers={'User-Agent': 'SecurityTest/1.0'})
            
            results.append({
                'test_case': test_case,
                'status_code': response.status_code,
                'response_length': len(response.text),
                'time': response.elapsed.total_seconds()
            })
            
        except Exception as e:
            results.append({
                'test_case': test_case,
                'error': str(e)
            })
            
    return results

# Example safe test cases
test_cases = [
    "' OR '1'='1",
    "admin' --",
    "' UNION SELECT NULL--",
    "' OR 1=1;--",
    "')) OR 1=1--",
    "admin'/*",
    "' OR '1'='1'#",
    "' OR 1=1#",
    "' OR 'x'='x",
]

def generate_report(results):
    """Generate security report from test results"""
    report = []
    for result in results:
        if 'error' in result:
            report.append(f"Test case '{result['test_case']}' failed: {result['error']}")
        else:
            report.append(
                f"Test case '{result['test_case']}'\n"
                f"Status: {result['status_code']}\n"
                f"Response size: {result['response_length']}\n"
                f"Response time: {result['time']:.2f}s\n"
            )
    return "\n".join(report)