import { Link, useParams } from 'react-router';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { allProjects } from '../data/projects';
import { TextBlock } from '../components/project-blocks/TextBlock';
import { ImageBlock } from '../components/project-blocks/ImageBlock';
import { TwoColumnBlock } from '../components/project-blocks/TwoColumnBlock';
import { ImageGallery } from '../components/project-blocks/ImageGallery';
import { VideoBlock } from '../components/project-blocks/VideoBlock';
import { FeatureList } from '../components/project-blocks/FeatureList';
import { QuoteBlock } from '../components/project-blocks/QuoteBlock';
import { CodeBlock } from '../components/project-blocks/CodeBlock';
import { useTheme } from '../context/ThemeContext';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = allProjects.find(p => p.id === Number(id));
  const { theme, colors } = useTheme();

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background, color: colors.text }}>
        <div className="text-center">
          <h1 className="text-4xl mb-4">Project Not Found</h1>
          <Link to="/projects" style={{ color: colors.primary }}>
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long',
      day: 'numeric'
    });
  };

  // Example code snippets
  const csharpExample = `public class PlayerController : MonoBehaviour
{
    [SerializeField] private float moveSpeed = 5f;
    [SerializeField] private float jumpForce = 10f;
    
    private Rigidbody2D rb;
    private bool isGrounded;
    
    void Start()
    {
        rb = GetComponent<Rigidbody2D>();
    }
    
    void Update()
    {
        HandleMovement();
        HandleJump();
    }
    
    private void HandleMovement()
    {
        float moveInput = Input.GetAxisRaw("Horizontal");
        rb.velocity = new Vector2(moveInput * moveSpeed, rb.velocity.y);
    }
    
    private void HandleJump()
    {
        if (Input.GetButtonDown("Jump") && isGrounded)
        {
            rb.AddForce(Vector2.up * jumpForce, ForceMode2D.Impulse);
        }
    }
}`;

  const shaderExample = `Shader "Custom/HolographicEffect"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _Color ("Color", Color) = (0, 1, 0, 1)
        _ScanlineSpeed ("Scanline Speed", Float) = 1.0
        _GlowIntensity ("Glow Intensity", Range(0, 2)) = 1.0
    }
    
    SubShader
    {
        Tags { "Queue"="Transparent" "RenderType"="Transparent" }
        Blend SrcAlpha OneMinusSrcAlpha
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #include "UnityCG.cginc"
            
            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };
            
            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };
            
            sampler2D _MainTex;
            float4 _Color;
            float _ScanlineSpeed;
            float _GlowIntensity;
            
            v2f vert (appdata v)
            {
                v2f o;
                o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }
            
            fixed4 frag (v2f i) : SV_Target
            {
                float scanline = sin(i.uv.y * 100 + _Time.y * _ScanlineSpeed);
                fixed4 col = tex2D(_MainTex, i.uv) * _Color;
                col.rgb *= (1 + scanline * 0.2) * _GlowIntensity;
                return col;
            }
            ENDCG
        }
    }
}`;

  const pythonExample = `import random
from enum import Enum

class EnemyState(Enum):
    IDLE = 1
    PATROL = 2
    CHASE = 3
    ATTACK = 4

class AIController:
    def __init__(self, detection_range=10, attack_range=2):
        self.state = EnemyState.IDLE
        self.detection_range = detection_range
        self.attack_range = attack_range
        self.patrol_points = []
        self.current_patrol_index = 0
    
    def update(self, player_position, enemy_position):
        distance_to_player = self.calculate_distance(player_position, enemy_position)
        
        if distance_to_player <= self.attack_range:
            self.state = EnemyState.ATTACK
        elif distance_to_player <= self.detection_range:
            self.state = EnemyState.CHASE
        elif self.patrol_points:
            self.state = EnemyState.PATROL
        else:
            self.state = EnemyState.IDLE
    
    def calculate_distance(self, pos1, pos2):
        return ((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)**0.5
    
    def add_patrol_point(self, point):
        self.patrol_points.append(point)`;

  return (
    <div className="min-h-screen transition-colors duration-500" style={{ backgroundColor: colors.background, color: colors.text }}>
      {/* Header with Back Button */}
      <div 
        className="sticky top-0 z-50 transition-colors duration-500" 
        style={{ 
          backgroundColor: colors.background, 
          borderBottom: `1px solid ${theme === 'light' ? '#e5e7eb' : '#242630'}` 
        }}
      >
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 transition-colors hover:opacity-80"
            style={{ color: colors.primary }}
          >
            <ArrowLeft size={20} />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl mb-4" style={{ color: colors.text }}>
            {project.title}
          </h1>
          <p className="text-lg mb-6" style={{ color: colors.textSecondary }}>
            {formatDate(project.date)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: theme === 'light' ? '#f0f1ec' : '#242630',
                  color: colors.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 mb-8">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{
                  backgroundColor: colors.primary,
                  color: theme === 'light' ? '#ffffff' : '#31333c',
                }}
              >
                <ExternalLink size={18} />
                <span>View Demo</span>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-90"
                style={{
                  backgroundColor: colors.cardBg,
                  color: colors.text,
                }}
              >
                <Github size={18} />
                <span>View Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Main Content - Mix and match these blocks as needed */}
        
        {/* EXAMPLE LAYOUT 1: Full-width Image */}
        <ImageBlock 
          src={project.image}
          alt={`${project.title} screenshot`}
          caption="Main gameplay screenshot"
        />

        {/* EXAMPLE LAYOUT 2: Text Block */}
        <TextBlock 
          title="Overview"
          content={`${project.description}

This is a placeholder for additional project description. You can add multiple paragraphs here to describe the project in detail, including your goals, challenges, and solutions.

Add as much or as little text as you need. The layout will automatically adjust.`}
        />

        {/* EXAMPLE LAYOUT 3: Two Column (Image Left) */}
        <TwoColumnBlock 
          imageLeft={true}
          imageSrc="https://images.unsplash.com/photo-1552820728-8b83bb6b773f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          imageAlt="Development process"
          title="Development Process"
          content="Here you can describe your development workflow, tools used, or any interesting technical challenges you faced during the project.

This two-column layout is great for breaking up large amounts of text with relevant images."
        />

        {/* EXAMPLE LAYOUT 4: Two Column (Image Right) */}
        <TwoColumnBlock 
          imageLeft={false}
          imageSrc="https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
          imageAlt="Game mechanics"
          title="Core Mechanics"
          content="Explain the core mechanics or systems of your project here. The image will appear on the right side this time.

You can alternate between left and right images to create visual variety."
        />

        {/* EXAMPLE LAYOUT 5: Feature List */}
        <FeatureList 
          title="Key Features"
          features={[
            "Feature one with detailed description of what it does",
            "Another important feature that made this project unique",
            "Technical achievement or innovation you're proud of",
            "Player feedback or review highlight",
            "Any awards or recognition received"
          ]}
        />

        {/* EXAMPLE LAYOUT 6: Image Gallery (3 columns) */}
        <ImageGallery 
          columns={3}
          images={[
            { src: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", alt: "Screenshot 1" },
            { src: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", alt: "Screenshot 2" },
            { src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", alt: "Screenshot 3" }
          ]}
        />

        {/* EXAMPLE LAYOUT 7: Quote Block */}
        <QuoteBlock 
          quote="This is a great place to add player testimonials, reviews, or your own reflections on the project."
          author="Player Review / Your Thoughts"
        />

        {/* EXAMPLE LAYOUT 8: Video Block */}
        <VideoBlock 
          src="/src/assets/gameplay.gif"
          caption="Gameplay demonstration"
          autoPlay={true}
        />

        {/* EXAMPLE LAYOUT 9: Image Gallery (2 columns) */}
        <ImageGallery 
          columns={2}
          images={[
            { src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", alt: "Concept art 1" },
            { src: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", alt: "Concept art 2" }
          ]}
        />

        {/* EXAMPLE LAYOUT 10: Text Block without title */}
        <TextBlock 
          content="You can also add text blocks without titles for closing thoughts, conclusions, or additional notes about the project.

Feel free to remove any of these example blocks and replace them with your own content!"
        />

        {/* EXAMPLE LAYOUT 11: Code Block (C#) */}
        <CodeBlock 
          title="Player Controller Script"
          language="csharp"
          code={csharpExample}
        />

        {/* EXAMPLE LAYOUT 12: Code Block (Shader) */}
        <CodeBlock 
          title="Holographic Effect Shader"
          language="glsl"
          code={shaderExample}
        />

        {/* EXAMPLE LAYOUT 13: Code Block (Python) */}
        <CodeBlock 
          title="AI Controller Class"
          language="python"
          code={pythonExample}
        />

      </div>
    </div>
  );
}