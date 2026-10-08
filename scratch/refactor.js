const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/screens');

const employeeFiles = ['Jobs.js', 'Messages.js', 'Activity.js', 'Profile.js', 'EmployeeDashboard.js'];
const employerFiles = ['Dashboard.js', 'SearchCandidates.js', 'EmployerMessages.js', 'EmployerProfileView.js', 'CreateJobPost.js'];
const adminFiles = ['Dashboard.js', 'ManageEmployees.js', 'ManageEmployers.js', 'ManageJobs.js', 'ReportsAnalytics.js', 'OpenToWork.js', 'TotalResumes.js'];

function processFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove Bottom Tab Bar blocks (Employee & Employer)
    // The blocks typically look like:
    // {/* Bottom Tab Bar */}
    // <View style={...bottomTabs...}> ... </View>
    // OR {/* Bottom Navigation */}
    // <View style={...bottomNav...}> ... </View>
    
    // We'll use a regex that matches from {/* Bottom to the closing </View> just before </SafeAreaView> or </View> at the end.
    // A safer regex: find `{/* Bottom.*?}` and remove it and the following `<View ...> ... </View>`
    
    content = content.replace(/\{\/\*\s*Bottom.*?\*\/\}\s*<View[\s\S]*?<\/View>/i, '');
    
    // Add React.memo and useCallback if they don't exist
    if (content.indexOf('export default') !== -1 && content.indexOf('React.memo') === -1) {
        // e.g. export default Jobs; -> export default React.memo(Jobs);
        content = content.replace(/export default (\w+);/, 'export default React.memo($1);');
    }
    
    // Add useMemo/useCallback to imports if react is imported
    if (content.indexOf('import React') !== -1 && content.indexOf('memo') === -1) {
        content = content.replace(/import React(.*?)(?=\s+from 'react')/, (match, p1) => {
            if (p1) {
                if (p1.includes('{')) {
                    if (!p1.includes('memo')) p1 = p1.replace('{', '{ memo, useCallback, useMemo, ');
                } else {
                    p1 += ', { memo, useCallback, useMemo }';
                }
            }
            return 'import React' + p1;
        });
    }

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Processed', filePath);
    }
}

employeeFiles.forEach(f => processFile(path.join(srcDir, 'Employee', f)));
employerFiles.forEach(f => processFile(path.join(srcDir, 'Employer', f)));
adminFiles.forEach(f => processFile(path.join(srcDir, 'Admin', f)));
