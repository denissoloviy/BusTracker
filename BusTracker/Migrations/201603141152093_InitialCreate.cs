namespace BusTracker.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class InitialCreate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BusModels",
                c => new
                    {
                        BusModelId = c.Int(nullable: false),
                        ModelOfBus = c.String(),
                    })
                .PrimaryKey(t => t.BusModelId);
            
            CreateTable(
                "dbo.Seats",
                c => new
                    {
                        SeatId = c.Int(nullable: false, identity: true),
                        BusModelId = c.Int(nullable: false),
                        SeatNumber = c.Int(nullable: false),
                        Left = c.String(),
                        Top = c.String(),
                    })
                .PrimaryKey(t => t.SeatId)
                .ForeignKey("dbo.BusModels", t => t.BusModelId, cascadeDelete: true)
                .Index(t => t.BusModelId);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Seats", new[] { "BusModelId" });
            DropForeignKey("dbo.Seats", "BusModelId", "dbo.BusModels");
            DropTable("dbo.Seats");
            DropTable("dbo.BusModels");
        }
    }
}
