"""Create a Word form with editable content controls and a Markdown companion."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from xml.sax.saxutils import escape
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
sections = []

def section(title, note, fields):
    sections.append((title, note, fields))

section('1 Account setup and hosting',
        'Complete this section first. IDs and public URLs are safe to enter. Never enter passwords, API keys, access tokens, recovery codes or secret deploy-hook URLs. Enter Pending when an account or URL is not ready.', [
    ('Sanity account ready', 'Choose: Yes / Not yet'),
    ('Sanity plan', 'Free — selected preference; change only if needed'),
    ('Sanity project ID', ''),
    ('Sanity dataset name', 'production — proposed; enter the actual name'),
    ('Public dataset confirmed', 'Choose: Yes / Not yet / Need help'),
    ('Sanity Studio URL', 'Pending'),
    ('Who will edit content', 'Choose: Only me / Other editors; list names if needed'),
    ('Render account ready', 'Previously: No access. Update: [Type here]'),
    ('Portfolio GitHub repository URL', ''),
    ('GitHub repository connected to Render', 'Choose: Yes / Not yet / Need help'),
    ('Preferred site name', ''),
    ('Domain choice', 'Choose: Free Render URL / My custom domain'),
    ('Custom domain if applicable', 'Optional; leave blank for a free URL'),
    ('Frontend URL if already created', 'Pending'),
    ('API URL if already created', 'Pending'),
    ('Setup help needed', 'List anything you want help configuring'),
])

section('2 Public profile and contact',
        'These values are carried forward from the project. Correct only what has changed. The fish varieties and STAR details are unresolved and may be omitted.', [
    ('Public name', 'M P Nayana Chandupa Muthunayaka'),
    ('Short display name', 'Nayana Muthunayaka'),
    ('Email', 'ncmuthunayaka@gmail.com'),
    ('GitHub profile', 'https://github.com/NCMuthunayaka'),
    ('LinkedIn profile', 'https://www.linkedin.com/in/muthunayaka'),
    ('Public location', 'Veyangoda, Sri Lanka'),
    ('Degree and university', 'BSc Honours in Software Engineering, Sabaragamuwa University of Sri Lanka'),
    ('Study stage and graduation', 'Year 3, Semester 2; expected graduation 2028'),
    ('Internship target', 'AI Engineering internship'),
    ('Start date and duration', 'June 2027; six months, flexible'),
    ('Work mode and relocation', 'Any work mode; relocation not planned'),
    ('Public introduction or corrections', 'Optional: provide replacement introduction or other corrections'),
    ('STAR programme details', 'Optional: issuer, role, dates and approved wording; or Skip for launch'),
    ('Fish business wording', 'Ornamental fish breeder and supplier; Bluepearl'),
    ('Approved fish varieties', 'Unconfirmed. List varieties that may be named, or Omit varieties'),
    ('Other activity corrections or evidence', 'Optional: WIE HOPE 2.0, Pawra, STEMUp, bank internship or other roles'),
])

section('3 Launch project selection',
        'Current local listings contain GoviSense and GNSS. Learnify remains unpublished until contribution review. WadaLink was not selected. Public repository and demo links were already permitted in the supplied input.', [
    ('Launch selection', 'Choose: GoviSense + GNSS / Add Learnify after review / Different selection'),
    ('Number of case studies at launch', 'Choose: 2 / 3'),
    ('Project display order', 'Proposed: GoviSense, GNSS, then Learnify if reviewed'),
    ('Home featured projects', 'Proposed: GoviSense and GNSS'),
    ('Include WadaLink', 'Current: No. If changing to Yes, provide the same evidence fields as the other projects'),
    ('Other project to include', 'Optional: name, repository and reason to include'),
])

projects = [
    ('GoviSense', 'Status not yet confirmed', 'https://github.com/NCMuthunayaka/GoviSense', 'https://govi-sense.vercel.app — availability unverified'),
    ('GNSS Gaussian SLD99 Processor', 'Complete — owner supplied', 'https://github.com/NCMuthunayaka/gnss_gaussian_sld99__processor', 'No public demo supplied; screenshots preferred'),
    ('Learnify', 'Complete — owner supplied; contribution review required before publication', 'https://github.com/NCMuthunayaka/Learnify-Web-capstone', 'https://learnify-web-capstone.vercel.app — availability unverified'),
]
for i, (name, status, repo, demo) in enumerate(projects, 4):
    section(f'{i} Project evidence for {name}',
            'Complete for projects selected for launch. For Learnify, skip this page if it will remain unpublished. Describe your own work separately from team, tutorial, library or adapted work. Measurements are optional; never estimate them as facts.', [
        ('Include this project at launch', 'Choose: Yes / No / After review'),
        ('Project status', status),
        ('Public repository', repo),
        ('Demo URL and whether it works now', demo),
        ('Who it helps and the problem', ''),
        ('What the project currently does', ''),
        ('What I personally built', 'List specific modules, features or decisions you implemented'),
        ('Team work and adapted components', 'Identify collaborators, libraries, tutorials or source material and attribution links'),
        ('Technology stack corrections', 'List the actual stack or write No corrections to the supplied notes'),
        ('One technical decision and tradeoff', 'What you chose, the alternative, and why'),
        ('How it was tested', 'Test workflow, sample data, checks or evidence link'),
        ('Demonstrable result', 'Describe an outcome that can be checked; no metric is required'),
        ('Measured results and evidence', 'Optional: metric, dataset/test method and evidence link; or No measured results'),
        ('Future improvements', 'List 1–3 improvements'),
        ('Approved screenshots', 'Filenames or accessible folder links; say which may be published'),
        ('Screenshot descriptions', 'For each image: what it shows and any attribution needed'),
        ('Architecture diagram', 'Approved file/link, or describe components and data flow for a diagram to be drafted'),
        ('Contribution review outcome', 'Choose: Accurate and approved / Corrections needed / Pending'),
    ])

section('7 Assets and resume',
        'Screenshots remain preferred over recordings. Do not upload customer information or private project data. A file link does not by itself grant permission to publish it.', [
    ('Shared asset folder', 'Optional: accessible link or local folder path'),
    ('Demo fallback preference', 'Screenshots; no recordings — existing preference'),
    ('Profile photo', 'Choose: Keep current photo / Replace with attached approved photo'),
    ('Share preview image', 'Choose: Provide approved image / Please create a draft / Skip for launch'),
    ('Share image file or requested wording', 'Optional; ideal size 1200 × 630'),
    ('Image attribution and restrictions', 'List required credits, restrictions or None'),
    ('Resume launch choice', 'Current: Request résumé; PDF is NOT approved for public sharing'),
    ('Resume choice update', 'Choose: Keep Request résumé / Provide PDF and explicitly approve public sharing'),
    ('Resume PDF filename or link', 'Only if supplying a PDF; otherwise Not available'),
    ('Resume public sharing permission', 'Current: No. Change to Yes only if explicitly approved'),
    ('Private resume backup permission', 'Not granted. Choose: No backup / Approve backup at this exact private location: [Type here]'),
])

section('8 Blog publication',
        'The article is currently a local draft. Publishing an article is optional for launch.', [
    ('Blog launch choice', 'Choose: Launch without an article / Publish after edits / Approve the existing draft'),
    ('Draft title', 'What makes a portfolio feel trustworthy?'),
    ('Final title if different', 'Optional'),
    ('Draft edits or replacement text', 'Provide edits here or attach an edited draft'),
    ('Three tags', ''),
    ('Related project', 'Choose a project, or None'),
    ('Article cover and attribution', 'Optional: approved image file/link and credit'),
    ('Article publication approval', 'Current: Pending. Choose: Approved / Not approved / After revisions'),
])

section('9 Assistant settings and approved answers',
        'Current mode is FAQ-only: it retrieves a stored approved answer and source link. Full RAG with Gemini is optional and requires additional implementation. Do not put an API key in this form.', [
    ('Assistant mode', 'Current: FAQ-only. Choose: Keep FAQ-only / Request full RAG with Gemini'),
    ('Approved topics', 'Choose any: Projects / Education / Internship availability / Contact / Other: [Type here]'),
    ('Refused topics', 'Private data, secrets, salary and customer details — existing preference'),
    ('Additional excluded topics', 'Optional'),
    ('Approved source pages or URLs', 'List which portfolio pages or public sources the assistant may use'),
    ('FAQ 1 question', ''), ('FAQ 1 approved answer', ''), ('FAQ 1 public source URL', ''),
    ('FAQ 2 question', ''), ('FAQ 2 approved answer', ''), ('FAQ 2 public source URL', ''),
    ('FAQ 3 question', ''), ('FAQ 3 approved answer', ''), ('FAQ 3 public source URL', ''),
    ('FAQ wording assistance', 'Choose: Use my answers / Draft answers for my review first'),
    ('If full RAG is selected', 'Confirm Google AI Studio access and whether a key can be configured privately; do not paste it here'),
    ('Provider spending preference', 'Only if full RAG is selected: Free quota only / Other budget: [Type here]'),
])

section('10 Launch instructions and return checklist',
        'Complete this after deciding what can be shared. Blank fields are not approval. You may return a partially completed form so setup can proceed while content is prepared.', [
    ('Launch content confirmed', 'List the projects and optional pages/content approved for launch'),
    ('Items to omit for now', 'For example: résumé PDF, blog article, Learnify, unverified metrics'),
    ('Public deployment preference', 'Choose: Prepare preview first / Publish after listed blockers are resolved / Keep local for now'),
    ('Target launch date', 'Optional'),
    ('Contact details and availability checked', 'Choose: Confirmed / Corrections entered in section 2'),
    ('Project contributions checked', 'Choose: Confirmed for selected projects / Still pending'),
    ('Asset permissions checked', 'Choose: Listed per file / Still pending'),
    ('Outstanding items and expected dates', ''),
    ('Other changes requested', ''),
    ('Completed by and date', ''),
])

W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
def p(text, style=None):
    props = f'<w:pPr><w:pStyle w:val="{style}"/></w:pPr>' if style else ''
    return f'<w:p>{props}<w:r><w:t xml:space="preserve">{escape(text)}</w:t></w:r></w:p>'

counter = 0
def row(label, value):
    global counter
    counter += 1
    control = (f'<w:sdt><w:sdtPr><w:alias w:val="{escape(label, {chr(34): "&quot;"})}"/>'
               f'<w:tag w:val="field_{counter:03d}"/><w:id w:val="{1000 + counter}"/>'
               '<w:text w:multiLine="1"/></w:sdtPr><w:sdtContent>' + p(value or '[Type here]') + '</w:sdtContent></w:sdt>')
    return ('<w:tr><w:trPr><w:cantSplit/></w:trPr>'
            '<w:tc><w:tcPr><w:tcW w:w="3000" w:type="dxa"/><w:shd w:fill="EAF0F8"/></w:tcPr>' + p(label) + '</w:tc>'
            '<w:tc><w:tcPr><w:tcW w:w="6360" w:type="dxa"/></w:tcPr>' + control + '</w:tc></w:tr>')

intro = [
    'Portfolio Completion Input Form',
    'Fill in the answer cells in Word. Replace [Type here], select one of the listed choices, or write Not available, Need help or Skip for launch. Existing preferences are prefilled; they are not new approvals.',
    'Start with account setup, launch project selection and the evidence pages for your selected projects. Complete the other sections as available. Do not send passwords, API keys, tokens or private customer data.',
    'Return the completed Word file or its Markdown companion, together with the referenced approved assets. Completing this form does not mean the website is already deployed.',
]
body = p(intro[0], 'Title') + ''.join(p(t) for t in intro[1:])
md = '# ' + intro[0] + '\n\n' + '\n\n'.join(intro[1:]) + '\n'
for index, (title, note, fields) in enumerate(sections):
    if index:
        body += '<w:p><w:r><w:br w:type="page"/></w:r></w:p>'
    body += p(title, 'Heading1') + p(note)
    body += '<w:tbl><w:tblPr><w:tblW w:w="9360" w:type="dxa"/><w:tblBorders>'
    body += ''.join(f'<w:{side} w:val="single" w:sz="4" w:color="C9D4E4"/>' for side in ['top','left','bottom','right','insideH','insideV'])
    body += '</w:tblBorders><w:tblCellMar><w:top w:w="90" w:type="dxa"/><w:left w:w="100" w:type="dxa"/><w:bottom w:w="90" w:type="dxa"/><w:right w:w="100" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid><w:gridCol w:w="3000"/><w:gridCol w:w="6360"/></w:tblGrid>'
    body += ''.join(row(label, value) for label, value in fields) + '</w:tbl>'
    md += f'\n## {title}\n\n{note}\n\n'
    md += '\n\n'.join(f'**{label}:** {value or "[Type here]"}' for label, value in fields) + '\n'

document = f'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="{W}"><w:body>{body}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="850" w:right="1100" w:bottom="850" w:left="1100"/></w:sectPr></w:body></w:document>'
styles = f'''<?xml version="1.0" encoding="UTF-8"?><w:styles xmlns:w="{W}">
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="21"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="75"/></w:pPr></w:pPrDefault></w:docDefaults>
<w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/></w:style>
<w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:rPr><w:b/><w:color w:val="16385C"/><w:sz w:val="38"/></w:rPr></w:style>
<w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:pPr><w:keepNext/><w:spacing w:before="180" w:after="120"/><w:outlineLvl w:val="0"/></w:pPr><w:rPr><w:b/><w:color w:val="16385C"/><w:sz w:val="28"/></w:rPr></w:style></w:styles>'''
types = '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>'
rels = '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
docrels = '<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'
target = ROOT / 'docs' / 'Portfolio_Completion_Input_Form.docx'
with ZipFile(target, 'w', ZIP_DEFLATED) as z:
    for name, content in {'[Content_Types].xml': types, '_rels/.rels': rels, 'word/document.xml': document, 'word/styles.xml': styles, 'word/_rels/document.xml.rels': docrels}.items():
        ET.fromstring(content)
        z.writestr(name, content.encode('utf-8'))
(target.with_suffix('.md')).write_text(md, encoding='utf-8')
with ZipFile(target) as z:
    assert z.testzip() is None
    root = ET.fromstring(z.read('word/document.xml'))
    assert len(root.findall(f'.//{{{W}}}sdt')) == counter
print(f'Created {target.name} and Markdown companion with {counter} editable fields across {len(sections)} sections.')
