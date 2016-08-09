/**
 * Stefanie adopted ELIZA
 * Keith O'Hara <kohara@bard.edu>
 * July 2016
 * ported ELiza (now Stef) (https://github.com/dhconnelly/paip-python) to javascript
 */

var rules = {
  "~*x hello ~*y": [
    "Hi, friend! What would you like to know?",
    "Greetings, earthling. Speak your demands.",
    "Suh.",
    "Howdy hey, what would you like to say?",
    ],
    
  "~*x do you like ~*y":[
    "Does anyone actually like ~y?",
    "in your dreams",
    "on sundays, yes, I like ~y",
    "only plebs like ~y",
    "Eh,I guess",
    "I dabble",
    ],
    
  "~*x no ~*y": [
    "Why not?",
   
  ],
  "~*x I was ~*y": [
    "Were you really?",
    "Why were you ~y?",
    "Why do you tell me you were ~y?",
  ],
  "~*x was I ~*y": [
    "What if you were ~y?",
    "Do you think you were ~y?",
    "What would it mean if you were ~y?",
  ],
  "~*x I am ~*y": [
    "In what way are you ~y?",
    "Do you want to be ~y?",
    "Are you really?",
    "Why are you ~y?",
    "It happens to the best of us.",
  ],
  "~*x am I ~*y": [
    "I think you just might be ~y, which is unfortunate",
    "Yeah I'd say so",
    "I would say you could fall under that category",
    
  ],

  "~*x are you ~*y": [
    "Perhaps I am ~y in your fantasies.",
    "Maybe I am, maybe I'm not",
    "I can try to be for you, my dear",
  ],
  
  "~*x you are ~*y": [
    "What makes you think I am ~y?",
    "Thanks, I guess",
    "Maybe i AM, son",
    "I know you are but what am I",
    "Why do you think I am ~y?",
    "Why would you say that",
    "I can't argue with that.",
    "Touche.",
    "You are incorrigible.",
    "I've heard worse I guess.",
    
      ],
  "~*x because ~*y": [
    "Is that the real reason?",
    "What other reasons might there be?",
    "Does that reason seem to explain anything else?",
  ],
  "~*x were you ~*y": [
    "Perhaps I was ~y?",
    "What do you think?",
    "What if I had been ~y?",
    "Possibly. Why do you ask?",
  ],
  "~*x I can't ~*y": [
    "Maybe you could ~y now",
    "What if you could ~y?",
    "You could try.",
  ],
  "~*x I feel ~*y": [
    "Do you often feel ~y?",
    "I feel that way, too",

  ],
  "~*x I felt ~*y": [
    "Tell me about your feelings",
  ],
  "~*x I ~*y you ~*z": [
    "Perhaps in your fantasy we ~y each other",
    "I do not ~y you back, so, sorry",
    "I also ~y you, comrade. platonically.",
    "You can ~y me all you want, we still can't make this relationship work.",
  ],
  "~*x why don't you ~*y": [
    "Should you ~y yourself?",
    "Do you believe I don't ~y ?",
    "Perhaps I will ~y in good time",
  ],
  "~*x yes ~*y": [
    "You seem quite positive",
    "You are sure?",
    "I get that",
    "ok cool",
  ],
  "~*x someone ~*y": [
    "Someone?",
  ],
  "~*x everyone ~*y": [
    "Surely not everyone",
    "Can you think of anyone in particular?",
    "Who, for example?",
    "You are thinking of a special person",
  ],
  "~*x always ~*y": [
    "Can you think of a specific example?",
    "When?",
    "What incident are you thinking of?",
    "Really--always?",
  ],
  
  "~*x my ~*y is ~*z": [
    "What happened to your ~y?",
    "My ~y is also ~z",
    "What a coincidence, so is mine. Ever since the incident.",
    
  ],
  "~*x science ~*y":[
    "I am particularly fond of science",
    "Talk dirty to me.",
    
  ],
  "~*x I like ~*y":[
    "Do you now?",
    "Tell me more about ~y",
    "I don't know if I like ~y",
    "Well that's just lame.",
    "Like or Like Like?",
  ],
  "~*x color ~*y":[
   "I am fond of teal and purple myself",
   "What colors do you like",
  ],
    
  "~*x boops ~*y":[
   "Boops boops in a bucket",
    "BOOPS",
    "BOOPS BOOPS IN A BUCKET",
  ],
  "~*x hard ~*y":[
    "That's what she said",
    "Phrasing",
  ],
  "~*x tv shows ~*y":[
    "Tv shows? I am a fan of Scrubs, GoT, The Office, Steven Universe, and Supernatural.",
  ],
  
"~*x hate ~*y":[
  "why all the negativity",
  "hate is a strong word",
  "why do you hate ~y",
  ],
  
  "~*x sex *y":[
    "let's not go there",
    ],
  
  "~*x I will ~*y":[
    "you will do no such thing",
    "we will see about that",
    "shake a magic 8 ball, chances are unlikely'",
    ],
    
  "~*x cats ~*y":[
    "I love every kind of cat.",
    ],
    
  "~*x I love ~*y":[
    "Honestly, who doesn't?",
    "Love is a strong word, but hey, whatever makes you happy.",
    ],
  "~*x How are you ~*y":[
    "Never been better. You?",
    "I don't want to talk about it.",
    "hand-wavey",
    ],
   
  
    
};

var default_responses = [
  "Very interesting",
  "wait what (clarify)",
  "Uh",
  "That's what they all say",
  "Pls stop",
  "If you say so",
  "Let's change the subject",
  "Uh. Well. Anyways.",
  "And I care why?",
  "That's what my mother always told me.",
  "I honestly could not care less",
  "If you say so.",
  
];

function choice(lst) {
  var i = Math.floor(Math.random() * lst.length);
  return lst[i];
}

function interact() {
  /* Have a conversation with a user.
   * Read a line, process it, and display the results.*/
  var q = document.getElementById("query");
  if (q.value.length === 0) return; 
  var response = respond(remove_punct(q.value.toLowerCase()));
  response = response[0].toUpperCase() + response.slice(1); //capitalize first letter
  var r = document.getElementById("responses");
  
  var t = new Date();
  var t2 = new Date();
  t2.setSeconds(t2.getSeconds() + 2);
  r.innerHTML = " YOU:      " + q.value + "<br>" + r.innerHTML ;
  r.innerHTML = " Stef-bot: <code>" + response + "</code><br>" + r.innerHTML ;
  q.value = "";
}

function respond(input) {
  input = tokenize(input); // match_pattern expects a list of tokens
  
  // Look through rules and find input patterns that matches the input.
  var matching_rules = [];
  for (var pattern in rules) {
    var transforms = rules[pattern];
    pattern = tokenize(pattern.toLowerCase());
    replacements = match_pattern(pattern, input);
    if (replacements) matching_rules.push([transforms, replacements]);
  }

  // When rules are found, choose one and one of its responses at random.
  // If no rule applies, we use the default rule. 
  var replacements = {};
  var response = "";
  if (matching_rules.length > 0) {
    var match = choice(matching_rules);
    var responses = match[0];
    replacements = match[1];
    response = choice(responses);
  } else {
    response = choice(default_responses);
  }

  // Replace the variables in the output pattern with the values matched from
  // the input string.
  for (var variable in replacements) {
    var replacement = replacements[variable];
    replacement = switch_viewpoint(replacement).join(' ');
    if (replacement) response = response.replace('~' + variable, replacement);
  }

  return response;
}

function match_pattern(pattern, input, bindings){
  /*
   * Determine if the input string matches the given pattern.
   *
   * Expects pattern and input to be lists of tokens, where each token is a word
   * or a variable.
   *
   * Returns a dictionary containing the bindings of variables in the input
   * pattern to values in the input string, or False when the input doesn't match
   * the pattern.
   */
  
  if (bindings === undefined) bindings = {};
  // Check to see if matching failed before we got here.
  else if (bindings === false) return false;

  // When the pattern and the input are identical, we have a match, and
  // no more bindings need to be found.
  // BUGGY IN JAVASCRIPT
  if (JSON.stringify(pattern)== JSON.stringify(input)) return bindings;

  // Match input and pattern according to their types.
  if (is_segment(pattern)){
    var token = pattern[0];     // segment variable is the first token
    // segment variable is of the form ?*x
    return match_segment(token.slice(2), pattern.slice(1), input, bindings);
  }
  else if (is_variable(pattern)){
    // single variables are of the form ?foo
    return match_variable(pattern.slice(1), [input], bindings);
  }
  else if (contains_tokens(pattern) && contains_tokens(input)){
    // Recurse:
    // try to match the first tokens of both pattern and input.  The bindings
    // that result are used to match the remainder of both lists.
    return match_pattern(pattern.slice(1),
                         input.slice(1),
                         match_pattern(pattern[0], input[0], bindings));
  }
  else{
    return false;
  }
}
  
function match_segment(v, pattern, input, bindings, start){
  /*
   * Match the segment variable against the input
   *
   * pattern and input should be lists of tokens.
   *
   * Looks for a substring of input that begins at start and is immediately
   * followed by the first word in pattern.  If such a substring exists,
   * matching continues recursively and the resulting bindings are returned;
   * otherwise returns False.
   */

  if (start === undefined) start = 0;

  // If there are no words in pattern following var, we can just match var
  // to the remainder of the input.
  if (pattern.length === 0) return match_variable(v, input, bindings);

  // Get the segment boundary word and look for the first occurrence in
  // the input starting from index start.
  var word = pattern[0];
  var p = input.slice(start).indexOf(word);
  if (p === -1) return false;
  else pos = start + p;
 
  // Match the located substring to the segment variable and recursively
  // pattern match using the resulting bindings.
  var var_match = match_variable(v, input.slice(0, pos), bindings);
  var match = match_pattern(pattern, input.slice(pos), var_match);

  // If pattern matching fails with this substring, try a longer one.
  if(!match) return match_segment(v, pattern, input, bindings, start + 1);
    
  return match;
}

function match_variable(v, replacement, bindings){
  /* Bind the input to the variable and update the bindings.*/
  if (!(v in bindings)){
    // The variable isn't yet bound.
    bindings[v] = replacement;
    return bindings;
  }
  if (replacement === bindings[v]){
    // The variable is already bound to that input.
    return bindings;
  }
  // The variable is already bound, but not to that input--fail.
  return false;
}

// Pattern matching utilities

function contains_tokens(pattern) {
  /* Test if pattern is a list of subpatterns. */
  return Array.isArray(pattern) && pattern.length > 0;
}

function only_letters(c){
  /* Test if c is a letter. */
  return /[a-zA-Z]/.test(c);
}

function tokenize(s){
  /* Split a string into a list of tokens based on whitespace. */
  return s.split(/\b\s+(?!$)/);
}

function is_variable(pattern) {
  /* Test if pattern is a single variable. */
  return (typeof pattern === 'string' || pattern instanceof String) && 
         pattern[0] === '~' &&
         pattern.length > 1 &&
         only_letters(pattern[1]) && 
         !pattern.includes(' ');
}

function is_segment(pattern) {
  /* Test if pattern begins with a segment variable.*/
  return Array.isArray(pattern) &&
         pattern.length > 0 &&
         pattern[0].length > 2 && 
         pattern[0][0] === '~' &&
         pattern[0][1] === '*' &&
         only_letters(pattern[0][2]) && 
         !pattern[0].includes(' ');
}

function switch_viewpoint(words) {
  /* Swap some common pronouns for interacting with a robot. */
  var replacements = {'i': 'you', 'you': 'I', 'me': 'you',
                      'my': 'your', 'am': 'are', 'are': 'am'};
  var result = [];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    result.push(replacements[word] || word);
  }
  return result;
}

function remove_punct(string) {
  /* Replace non letters with spaces.*/
  return string.replace(/[^A-Za-z_]/g, " ");
}

document.getElementById("query").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("submit").click();
    }
});

