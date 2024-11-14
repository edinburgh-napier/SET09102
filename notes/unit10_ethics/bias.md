

# Bias

Bias in a software system refers to the systematic favouring or disadvantaging of certain groups, 
perspectives, or outcomes within the system’s operation or results. This bias can manifest in algorithms, 
data handling, user interfaces, and automated decision-making processes, often impacting the fairness, 
reliability, and inclusivity of the system. Algorithms are used to automate decisions and predictions 
across numerous domains, from healthcare and finance to recruitment and criminal justice. However, these 
algorithms are only as unbiased as the data and design choices underpinning them. While software systems 
are designed to operate objectively, they are ultimately built on human-defined data, parameters, and 
assumptions, which can introduce unintended biases.

Understanding bias in algorithms requires recognising that biases can be both explicit and implicit. 
Explicit biases occur when certain groups are systematically disadvantaged through consciously applied 
rules or criteria. Implicit biases, on the other hand, often emerge unintentionally, as algorithms reflect 
patterns in historical data that may contain existing societal biases. For instance, a recruitment algorithm 
trained on historical hiring data may unintentionally favour candidates similar to those hired in the past, 
reinforcing discriminatory practices.

Bias in software often arises from the data used to train machine learning models or inform decision-making 
algorithms. If the training data is skewed, unrepresentative, or reflects societal biases, the software may 
learn patterns that reinforce these biases, leading to inequitable outcomes. For example, a credit scoring 
algorithm may exhibit bias if it was trained on historical financial data that excludes certain demographics 
or perpetuates past discriminatory practices, resulting in unfair scoring for those groups.

{: .information-title }
> <i class="fa-solid fa-circle-info"></i> CASE STUDY: AI-enhanced recruitment
>
> One prominent example of bias in machine learning is the case of a recruitment algorithm used by a large 
> technology company to screen job applicants. The algorithm was designed to assist in the hiring process by 
> automatically reviewing CVs and ranking candidates, ostensibly making the recruitment process faster 
> and more efficient. However, the system was trained on historical hiring data, which reflected past hiring 
> patterns and preferences of the company.
>
> The historical data used to train the algorithm included resumes of past applicants who were predominantly 
> male, due to long-standing imbalances in the technology sector. As a result, the algorithm learned patterns 
> that favoured male candidates over female candidates. For instance, it would penalise CVs that contained 
> words associated with women, such as references to all-women’s colleges or organisations, and favour keywords 
> typically found in CVs from men. This led to systematic bias, where female candidates were unfairly rated 
> lower than equally qualified male counterparts.
> 
> The company discovered this bias during internal testing, finding that the algorithm was not making objective 
> hiring decisions but instead replicating and amplifying gender biases present in the historical data. Despite 
> attempts to adjust the model, the bias proved difficult to remove entirely, as it was deeply embedded in the 
> training data itself. This case highlighted the challenge of relying on historical data that contains 
> inherent biases, as machine learning models tend to learn and perpetuate these patterns.
> 
> This is not an isolated example as demonstrated by multiple studies on the topic:
> 
> * [Houser, 2019. Can AI Solve the Diversity Problem in the Tech Industry? Mitigating Bias in Employment Decision-Making](https://ssrn.com/abstract=3344751)
> * [Köchling & Wehner, 2020. Discriminated by an Algorithm: A Systematic Review of Discrimination and Fairness in HR Recruitment and Development](https://doi.org/10.1007/s40685-020-00134-w)
> * [Pena, 2020. Bias in Multimodal AI: Testbed for Fair Automatic Recruitment](https://doi.org/10.1109/CVPRW50498.2020.00022)
> * [Njoto et al. 2022. Gender Bias in AI Recruitment Systems: A Sociological and Data Science-Based Case Study](https://doi.org/10.1109/ISTAS55053.2022.10227106)
> * [Frissen et al. 2023. A Machine Learning Approach to Recognize Bias and Discrimination in Job Advertisements](https://doi.org/10.1007/s00146-022-01574-0)
> * [Chen, 2023. Ethics and Discrimination in AI-Enabled Recruitment Practices](https://doi.org/10.1057/s41599-023-02079-x)
> * [Rietdijk, 2024. The Relationship Between AI Recruitment and Gender Bias: A Literature Review](http://arno.uvt.nl/show.cgi?fid=172389)
>
> The recruitment algorithm was ultimately discontinued, but the case served as a powerful lesson on the 
> importance of carefully considering training data and potential biases in automated decision-making systems. 
> It emphasised the need for diverse and balanced datasets and underscored the ethical responsibility of 
> companies to scrutinise the potential impact of machine learning applications, especially when these systems 
> affect individuals’ career opportunities and livelihoods.

Another source of bias in software systems is the design and development process itself. Engineers and 
designers make countless choices in setting parameters, selecting features, and tuning algorithms, often 
based on subjective assumptions. These choices, while seemingly innocuous, can influence outcomes in ways 
that favour certain results or unintentionally ignore diverse user needs. For instance, a facial recognition 
system may underperform for certain skin tones if it was trained primarily on images from lighter-skinned 
individuals, leading to biased performance across demographic groups.

Bias in software systems can have significant ethical and social consequences, especially in applications 
that impact real-life opportunities, such as recruitment, lending, or criminal justice. Addressing bias 
requires a proactive approach that includes diverse data collection, rigorous testing across various 
demographics, and ongoing evaluation to ensure that the system’s outputs are fair, accurate, and aligned 
with ethical standards. By acknowledging and addressing bias, engineers contribute to more equitable and 
trustworthy software systems.

{: .information-title }
> <i class="fa-solid fa-circle-info"></i> CASE STUDY: Bias is not all about AI
>
> A recent example of bias in a non-AI computer system occurred with the UK’s A-level grading algorithm 
> used in 2020. Due to the COVID-19 pandemic, traditional in-person exams were cancelled, and the UK 
> government decided to use an algorithmic approach to assign grades to students based on predicted scores 
> and school performance data. The aim was to ensure consistency in grading without holding exams. However, 
> the system’s design led to widespread bias, particularly disadvantaging students from lower-performing 
> schools.
> 
> The algorithm was primarily based on a combination of students’ predicted grades (provided by teachers) 
> and the historical performance of their schools in previous years. For large classes, the algorithm 
> weighed school performance history heavily, often reducing individual predicted grades if the school 
> had previously underperformed. This approach introduced a systematic bias, as it disproportionately 
> penalised students from schools in less affluent areas, where historical performance was often lower. 
> In contrast, students from schools with higher historical performance (often in wealthier areas) were 
> more likely to see their predicted grades maintained or even increased.
> 
> The bias resulted from a rigid application of historical school data as a proxy for individual student 
> ability, which failed to account for individual circumstances and potential improvements by students. 
> As a result, high-achieving students at underperforming schools were downgraded, despite having received 
> strong predicted grades from their teachers. Students from disadvantaged backgrounds were more likely to 
> be affected, as they were more often enrolled in schools with lower historical performance metrics.
> 
> The outcome of this biased system sparked significant public outcry. Students, teachers, and parents 
> criticised the algorithm for unfairly penalising hardworking students who had overcome educational 
> disadvantages. Many argued that the system favoured students from privileged backgrounds and undermined 
> the meritocratic principles of the exam system. The backlash eventually led the UK government to reverse 
> its decision and allow students to receive grades based solely on teacher predictions.
> 
> [Kolkman & van Maanen, 2021](https://doi.org/10.1080/01972243.2024.2398046)

## Bias mitigation

Software engineers and data scientists have a responsibility to identify and mitigate bias in algorithms, 
as biased outputs can lead to unfair or harmful outcomes for individuals and groups. By understanding how 
biases arise and actively implementing techniques to reduce or eliminate them, engineers can create fairer, 
more transparent systems. The follwing sections summarise some practical strategies for evaluating and 
mitigating these biases to ensure ethical and responsible algorithm design.

### Data Management and Preprocessing

Bias often originates in the data used to train algorithms, so managing and preprocessing data with 
fairness in mind is a critical first step. Engineers should carefully review datasets for balance and 
diversity to ensure they represent the populations impacted by the algorithm. This might involve 
techniques like data balancing, which adjusts the proportions of different demographic groups, or data 
augmentation, where additional data is created or sourced to fill representational gaps. Engineers can 
also anonymise or remove features, such as gender or ethnicity, to reduce the influence of potentially 
biased attributes, though this requires careful consideration to ensure it doesn’t obscure other, less 
overt biases. For a more detailed discussion of handling unbalanced data, please see
[5 Techniques to Handle Imbalanced Data For a Classification Problem](https://www.analyticsvidhya.com/blog/2021/06/5-techniques-to-handle-imbalanced-data-for-a-classification-problem/).

### Bias Metrics and Fairness Testing

Regular evaluation using fairness metrics helps detect and quantify bias in algorithmic outputs. Metrics 
such as demographic parity (ensuring similar outcomes across groups), equalised odds (ensuring equal error 
rates), and disparate impact (comparing the success rates across groups) provide a concrete basis for 
assessing bias. By setting up continuous testing with these metrics, engineers can identify potential 
biases early and track changes over time. Tools such as IBM’s [AI Fairness 360](https://aif360.res.ibm.com/), 
Microsoft’s [Fairlearn](https://fairlearn.org/), and 
Google’s [What-If Tool](https://pair-code.github.io/what-if-tool/) help engineers apply these fairness 
metrics in practice, with features for visualising and examining model performance across various groups.

### Incorporating Fairness Constraints in Model Training

In cases where bias persists, engineers can introduce fairness constraints directly into model training. 
This approach, called fairness-aware machine learning, involves optimising the model not only for accuracy 
but also for fairness. For instance, regularisation techniques can be applied to penalise the model for 
generating biased outcomes, steering it towards balanced predictions. Pre-processing algorithms, such as 
[re-weighting](https://doi.org/10.48550/arXiv.2202.01719) or 
[sampling](https://doi.org/10.1145/3617555.3617871), can also be used to adjust the training data 
distribution, making it easier for the model to learn fair patterns. Fairness-aware approaches typically 
involve trade-offs between accuracy and fairness, so careful evaluation is necessary to balance these goals.

### Human-in-the-Loop (HITL) Evaluation

Integrating human oversight through 
[Human-in-the-Loop](https://link.springer.com/article/10.1007/s10462-022-10246-w) (HITL) systems allows 
for more nuanced bias evaluation. This approach involves having human reviewers examine algorithmic outputs, 
particularly for decisions impacting individuals (such as hiring, lending, or medical predictions). HITL 
enables reviewers to spot biases that may not be immediately visible in the data and to bring ethical 
considerations into the review process. By combining human insight with algorithmic decision-making, 
HITL helps ensure that decisions align with broader ethical standards and values.

### Scenario Analysis and Sensitivity Testing

[Scenario analysis](https://doi.org/10.1145/3465416.3483305) and 
[sensitivity testing](https://doi.org/10.1145/3593013.3593983) allow engineers to simulate how the 
algorithm performs under different conditions and across varied demographic scenarios. This testing 
evaluates whether the model reacts consistently and fairly when presented with slight variations, such 
as different socioeconomic backgrounds or geographical locations. These tests reveal hidden biases and 
enable developers to understand the contexts in which the model may exhibit bias, guiding adjustments 
for greater robustness and fairness.

### Continuous Monitoring and Adjustment

Bias mitigation is an ongoing process, as new biases can emerge with shifts in user behaviour, changes in 
the data environment, or updates to the algorithm itself. Continuous monitoring of deployed algorithms 
ensures that any new biases are detected and addressed promptly. Engineers can set up automated alerting 
for fairness metrics, so that significant deviations trigger reviews and corrective actions. By treating 
bias mitigation as an ongoing responsibility, rather than a one-time task, engineers help maintain 
ethical standards and adapt to evolving societal expectations.

### Ethical Review and Collaboration

Lastly, involving interdisciplinary perspectives, such as ethics experts, sociologists, or legal 
advisors, in the review process promotes a more comprehensive understanding of bias implications. 
Collaborative ethical reviews provide context that technical evaluations alone may miss, helping 
engineers anticipate and prevent unintended consequences. This collaborative approach fosters a culture 
of accountability, ensuring that bias mitigation becomes part of a larger organisational commitment 
to responsible technology development.



